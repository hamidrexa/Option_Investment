'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
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
import symbolsData from '@/data/symbols.json';

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

// Put columns should have 'نماد' as the rightmost column (closest to strike)
const putColumns = [...callColumns];

// Call columns should be reversed so 'نماد' is closest to strike (leftmost)
const callColumnsReversed = [...callColumns].reverse();

const formatValue = (value: any) => {
    if (typeof value === 'number') {
        return value.toLocaleString('fa-IR', { maximumFractionDigits: 2 });
    }
    if (value === 'call') return 'خرید';
    if (value === 'put') return 'فروش';
    return value;
}

const getSymbolName = (symbolId: string): string => {
  const symbol = symbolsData.find(s => s.id === symbolId);
  return symbol ? symbol.symbol : symbolId;
}

const calculateDaysUntilExpiration = (expireDate: string): number => {
  const today = new Date();
  const expire = new Date(expireDate);
  const timeDiff = expire.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return Math.max(0, daysDiff);
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

  const visibleCallColumns = callColumnsReversed.filter(col => visibleColumns[col.accessor]);
  const visiblePutColumns = putColumns.filter(col => visibleColumns[col.accessor]);

  
  // For put table: 'نماد' should be the rightmost column (last in array for RTL)
  const visiblePutColumnsOrdered = useMemo(() => {
    const cols = visiblePutColumns.slice();
    const idx = cols.findIndex(c => c.accessor === 'l18');
    if (idx > -1) {
      const [namad] = cols.splice(idx, 1);
      cols.push(namad); // Put 'نماد' at the end (rightmost in RTL)
    }
    return cols;
  }, [visiblePutColumns]);

  // For call table: 'نماد' should be the leftmost column (first in array)
  const visibleCallColumnsOrdered = useMemo(() => {
    const cols = visibleCallColumns.slice();
    const idx = cols.findIndex(c => c.accessor === 'l18');
    if (idx > -1) {
      const [namad] = cols.splice(idx, 1);
      cols.unshift(namad); // Put 'نماد' at the beginning (leftmost)
    }
    return cols;
  }, [visibleCallColumns]);

  // Refs to sync horizontal scroll between put and call tables
  const putScrollRef = useRef<HTMLDivElement>(null);
  const callScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const putTable = putScrollRef.current;
    const callTable = callScrollRef.current;
    
    if (!putTable || !callTable) return;
    
    let isSyncing = false;
    
    const syncPutToCall = (e: Event) => {
      if (isSyncing) return;
      isSyncing = true;
      const target = e.target as HTMLElement;
      callTable.scrollLeft = target.scrollLeft;
      setTimeout(() => { isSyncing = false; }, 0);
    };
    
    const syncCallToPut = (e: Event) => {
      if (isSyncing) return;
      isSyncing = true;
      const target = e.target as HTMLElement;
      putTable.scrollLeft = target.scrollLeft;
      setTimeout(() => { isSyncing = false; }, 0);
    };
    
    putTable.addEventListener('scroll', syncPutToCall, { passive: true });
    callTable.addEventListener('scroll', syncCallToPut, { passive: true });
    
    return () => {
      putTable.removeEventListener('scroll', syncPutToCall);
      callTable.removeEventListener('scroll', syncCallToPut);
    };
  }, [groupedOptions]);

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

  const symbolName = selectedSymbol ? getSymbolName(selectedSymbol) : '';
  const daysUntilExpiration = data?.[0]?.expire_date ? calculateDaysUntilExpiration(data[0].expire_date) : 0;
  const maturity = data?.[0]?.mature || 0;

  return (
    <Card dir="rtl">
        <CardHeader className="flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <CardTitle>{`زنجیره اختیار معامله برای ${symbolName}`}</CardTitle>
                <CardDescription>{`تاریخ سررسید: ${selectedDate} - ${maturity} روز تا سررسید - تعداد کل قراردادها: ${data[0].options.length}`}</CardDescription>
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
          <div className="w-full hidden md:flex items-start gap-3" dir="rtl">
            {/* Put table - horizontally scrollable */}
            <div ref={putScrollRef} className="flex-1 overflow-x-auto overflow-y-visible">
              <Table className="min-w-max">
                <TableHeader>
                  <TableRow>
                    {visiblePutColumnsOrdered.map((col, index) => (
                      <TableHead
                        key={`put-header-${col.accessor}`}
                        className={`text-right whitespace-nowrap ${col.accessor === 'l18' ? 'sticky right-0 z-20 bg-background' : ''}`}
                      >
                        {col.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from(groupedOptions.keys()).map(strike => (
                    <TableRow key={`desktop-put-row-${strike}`}>
                      {visiblePutColumnsOrdered.map((col, index) => (
                        <TableCell
                          key={`put-cell-${strike}-${col.accessor}`}
                          className={`text-right text-xs whitespace-nowrap ${col.accessor === 'l18' ? 'sticky right-0 z-10 bg-background' : ''}`}
                        >
                          {groupedOptions.get(strike)?.put ? formatValue((groupedOptions.get(strike)!.put as any)[col.accessor]) : '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Strike prices - fixed center column */}
            <div className="shrink-0 w-36">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center font-bold whitespace-nowrap">قیمت اعمال</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from(groupedOptions.keys()).map(strike => (
                    <TableRow key={`desktop-strike-row-${strike}`}>
                      <TableCell className="font-semibold text-center bg-muted whitespace-nowrap">
                        {strike.toLocaleString('fa-IR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Call table - horizontally scrollable */}
            <div ref={callScrollRef} className="flex-1 overflow-x-auto overflow-y-visible">
              <Table className="min-w-max">
                <TableHeader>
                  <TableRow>
                    {visibleCallColumnsOrdered.map((col, index) => (
                      <TableHead
                        key={`call-header-${col.accessor}`}
                        className={`text-right whitespace-nowrap ${col.accessor === 'l18' ? 'sticky left-0 z-20 bg-background' : ''}`}
                      >
                        {col.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from(groupedOptions.keys()).map(strike => (
                    <TableRow key={`desktop-call-row-${strike}`}>
                      {visibleCallColumnsOrdered.map((col, index) => (
                        <TableCell
                          key={`call-cell-${strike}-${col.accessor}`}
                          className={`text-right text-xs whitespace-nowrap ${col.accessor === 'l18' ? 'sticky left-0 z-10 bg-background' : ''}`}
                        >
                          {groupedOptions.get(strike)?.call ? formatValue((groupedOptions.get(strike)!.call as any)[col.accessor]) : '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

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
