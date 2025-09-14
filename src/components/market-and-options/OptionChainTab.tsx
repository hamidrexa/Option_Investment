'use client';

import { useMemo } from 'react';
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

  const groupedOptions = useMemo(() => {
    if (!data || data.length === 0 || !data[0].options) return new Map();

    const grouped = new Map<number, { call?: Option, put?: Option }>();
    
    data[0].options.forEach(option => {
      const strike = option.strike;
      const existing = grouped.get(strike) || {};
      if (option.status === 'call') {
        existing.call = option;
      } else if (option.status === 'put') {
        existing.put = option;
      }
      grouped.set(strike, existing);
    });

    return new Map([...grouped.entries()].sort((a, b) => a[0] - b[0]));
  }, [data]);

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
        <CardHeader>
            <CardTitle>{`زنجیره اختیار معامله برای ${selectedSymbol}`}</CardTitle>
            <CardDescription>{`تاریخ سررسید: ${selectedDate} - تعداد کل قراردادها: ${data[0].options.length}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[70vh] w-full">
            <div className="flex justify-between">
                {/* Calls Table (Right) */}
                <div className="w-[45%]">
                    <h3 className="text-lg font-semibold text-center mb-2 text-green-600">اختیار خرید (Calls)</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {callColumns.map(col => <TableHead key={`call-${col.accessor}`} className="text-right">{col.header}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(groupedOptions.keys()).map(strike => (
                                <TableRow key={`call-row-${strike}`}>
                                    {callColumns.map(col => (
                                        <TableCell key={`call-cell-${strike}-${col.accessor}`} className="text-right text-xs">
                                            {groupedOptions.get(strike)?.call ? formatValue((groupedOptions.get(strike)!.call as any)[col.accessor]) : '-'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Strike Price Column (Center) */}
                <div className="w-[10%] flex flex-col items-center pt-12">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center font-bold">قیمت اعمال</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(groupedOptions.keys()).map(strike => (
                                <TableRow key={`strike-row-${strike}`}>
                                    <TableCell className="text-center font-semibold bg-muted">{strike.toLocaleString('fa-IR')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Puts Table (Left) */}
                <div className="w-[45%]">
                    <h3 className="text-lg font-semibold text-center mb-2 text-red-600">اختیار فروش (Puts)</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {putColumns.map(col => <TableHead key={`put-${col.accessor}`} className="text-right">{col.header}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(groupedOptions.keys()).map(strike => (
                                <TableRow key={`put-row-${strike}`}>
                                    {putColumns.map(col => (
                                        <TableCell key={`put-cell-${strike}-${col.accessor}`} className="text-right text-xs">
                                            {groupedOptions.get(strike)?.put ? formatValue((groupedOptions.get(strike)!.put as any)[col.accessor]) : '-'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
          </ScrollArea>
        </CardContent>
    </Card>
  );
};
