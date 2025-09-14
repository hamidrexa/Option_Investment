'use client';

import { useMemo, useState } from 'react';
import { useOptionChain } from '@/context/OptionChainContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Option } from '@/services/symbolService';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ListFilter } from 'lucide-react';

const callColumns = [
  { accessor: 'l18', header: 'نماد' },
  { accessor: 'pc', header: 'پایانی' },
  { accessor: 'pl', header: 'آخرین' },
  { accessor: 'status', header: 'وضعیت' },
  { accessor: 'tvol', header: 'حجم' },
  { accessor: 'tval', header: 'ارزش معاملات' },
  { accessor: 'position', header: 'موقعیت باز' },
  { accessor: 'shekaf_gheymat', header: 'شکاف قیمت' },
  { accessor: 'blackscholes', header: 'بلک شولز' },
  { accessor: 'lever', header: 'اهرم' },
  { accessor: 'delta', header: 'دلتا' },
  { accessor: 'gamma', header: 'گاما' },
  { accessor: 'margin', header: 'حاشیه سود' },
  { accessor: 'rho', header: 'رو' },
  { accessor: 'theta', header: 'تتا' },
  { accessor: 'vega', header: 'وگا' },
];

const putColumns = [...callColumns].slice().reverse();

const formatValue = (value: any) => {
    if (typeof value === 'number') {
        return value.toLocaleString('fa-IR', { maximumFractionDigits: 2 });
    }
    if (value === 'call') return 'خرید';
    if (value === 'put') return 'فروش';
    return value;
}

export function OptionChainTab() {
  const { data, isLoading, error, selectedSymbol, selectedDate } = useOptionChain();
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    callColumns.reduce((acc, col) => ({ ...acc, [col.accessor]: true }), {})
  );

  const groupedOptions = useMemo(() => {
    if (!data || data.length === 0 || !data[0].options) {
      console.log("No data or options available for grouping.");
      return new Map();
    }
    console.log("Data received in OptionChainTab for grouping:", data);

    const grouped = new Map<number, { call?: Option, put?: Option }>();
    
    data[0].options.forEach(option => {
      const strike = option.strike;
      const existing = grouped.get(strike) || {};
      // Bug fix: Use l30 to determine option type as requested by user
      if (option.l30.includes('اختيارخ')) { // 'خ' for 'خرید' (Call)
        existing.call = option;
      } else if (option.l30.includes('اختيارف')) { // 'ف' for 'فروش' (Put)
        existing.put = option;
      }
      grouped.set(strike, existing);
    });

    console.log("Grouped options by strike:", grouped);
    return new Map([...grouped.entries()].sort((a, b) => a[0] - b[0]));
  }, [data]);

  const visibleCallColumns = callColumns.filter(col => visibleColumns[col.accessor]);
  const visiblePutColumns = putColumns.filter(col => visibleColumns[col.accessor]);

  if (isLoading) {
    return (
        <div className="p-4 space-y-4">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-96 w-full" />
        </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!data || groupedOptions.size === 0) {
    return (
      <div className="text-center py-10" dir="rtl">
        <p className="text-muted-foreground">
          برای مشاهده زنجیره اختیار معامله، لطفاً یک نماد و قرارداد را از تب 'نمادها' انتخاب کنید.
        </p>
      </div>
    );
  }

  return (
    <Card dir="rtl">
        <CardHeader className="flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <CardTitle>{`زنجیره اختیار معامله برای ${selectedSymbol}`}</CardTitle>
                <CardDescription>{`تاریخ سررسید: ${selectedDate} - تعداد کل قراردادها: ${data[0].options.length}`}</CardDescription>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <ListFilter className="ml-2 h-4 w-4" />
                        انتخاب ستون‌ها
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {callColumns.map(col => (
                        <DropdownMenuCheckboxItem
                            key={col.accessor}
                            className="text-right"
                            checked={visibleColumns[col.accessor]}
                            onCheckedChange={(checked) =>
                                setVisibleColumns(prev => ({ ...prev, [col.accessor]: !!checked }))
                            }
                        >
                            {col.header}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>
        <CardContent>
          {/* Desktop View */}
          <ScrollArea className="h-[75vh] w-full hidden md:block" type="auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {visiblePutColumns.map(col => <TableHead key={`put-header-${col.accessor}`} className="text-right">{col.header}</TableHead>)}
                  <TableHead className="text-center font-bold sticky right-0 left-0 bg-muted z-20">قیمت اعمال</TableHead>
                  {visibleCallColumns.map(col => <TableHead key={`call-header-${col.accessor}`} className="text-right">{col.header}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from(groupedOptions.keys()).map(strike => (
                  <TableRow key={`desktop-row-${strike}`}>
                    {/* Puts */}
                    {visiblePutColumns.map(col => (
                      <TableCell key={`put-cell-${strike}-${col.accessor}`} className="text-right text-xs">
                        {groupedOptions.get(strike)?.put ? formatValue((groupedOptions.get(strike)!.put as any)[col.accessor]) : '-'}
                      </TableCell>
                    ))}
                    {/* Strike */}
                    <TableCell className="font-semibold text-center bg-muted sticky right-0 left-0 z-10">
                      {strike.toLocaleString('fa-IR')}
                    </TableCell>
                    {/* Calls */}
                    {visibleCallColumns.map(col => (
                      <TableCell key={`call-cell-${strike}-${col.accessor}`} className="text-right text-xs">
                        {groupedOptions.get(strike)?.call ? formatValue((groupedOptions.get(strike)!.call as any)[col.accessor]) : '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          {/* Mobile View */}
          <ScrollArea className="h-[75vh] w-full md:hidden" type="auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">قیمت اعمال</TableHead>
                  <TableHead className="text-center">اختیار خرید (Call)</TableHead>
                  <TableHead className="text-center">اختیار فروش (Put)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from(groupedOptions.keys()).map(strike => (
                  <TableRow key={`mobile-row-${strike}`}>
                    <TableCell className="font-semibold text-center bg-muted">{strike.toLocaleString('fa-IR')}</TableCell>
                    <TableCell>
                      {groupedOptions.get(strike)?.call ? (
                        <div className="space-y-1">
                          {visibleCallColumns.map(col => (
                            <div key={`mobile-call-${strike}-${col.accessor}`} className="text-xs flex justify-between">
                              <span className="font-semibold">{col.header}:</span>
                              <span>{formatValue((groupedOptions.get(strike)!.call as any)[col.accessor])}</span>
                            </div>
                          ))}
                        </div>
                      ) : '-'
                      }
                    </TableCell>
                    <TableCell>
                      {groupedOptions.get(strike)?.put ? (
                        <div className="space-y-1">
                          {visiblePutColumns.map(col => (
                            <div key={`mobile-put-${strike}-${col.accessor}`} className="text-xs flex justify-between">
                              <span className="font-semibold">{col.header}:</span>
                              <span>{formatValue((groupedOptions.get(strike)!.put as any)[col.accessor])}</span>
                            </div>
                          ))}
                        </div>
                      ) : '-'
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
    </Card>
  );
};
