'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import optionChainsData from '@/data/seed/option-chains.json'; // Changed to default import
import { Separator } from '@/components/ui/separator';
import { ListFilter, FileCog } from 'lucide-react';
import { AnalyticalMetrics } from './AnalyticalMetrics';

// Mock data for underlying asset price
const UNDERLYING_PRICE = 150.0;

const allColumns = [
    { id: 'symbol', label: 'نماد' },
    { id: 'last', label: 'آخرین قیمت' }, 
    { id: 'change', label: 'تغییر' }, 
    { id: 'bid', label: 'خرید' },
    { id: 'ask', label: 'فروش' },
    { id: 'volume', label: 'حجم معاملات' },
    { id: 'openInterest', label: 'موقعیت‌های باز' },
    { id: 'impliedVol', label: 'نوسان ضمنی' }, 
    { id: 'delta', label: 'دلتا' },
    { id: 'gamma', label: 'گاما' },
    { id: 'vega', label: 'وگا' },
    { id: 'theta', label: 'تتا' },
];

export function OptionChainTab() {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    symbol: true,
    last: true,
    change: true,
    bid: true,
    ask: true,
    volume: true,
    openInterest: true,
    impliedVol: true,
    delta: false,
    gamma: false,
    vega: false,
    theta: false,
  });

  const [sortBy, setSortBy] = useState('strike');
  const [minStrike, setMinStrike] = useState('');
  const [maxStrike, setMaxStrike] = useState('');

  const expirationDates = useMemo(() => {
    // Accessing contracts array within the "خودرو" key using the default import
    const contracts = optionChainsData.خودرو?.contracts || [];
    const dates = new Set(contracts.map((c: any) => c.expiry)); 
    return Array.from(dates).sort();
  }, []);

  const getOptionStatus = (type: 'call' | 'put', strike: number) => {
    const price = UNDERLYING_PRICE;
    if (Math.abs(price - strike) < 5) return 'atm'; // At-the-Money
    if ((type === 'call' && strike < price) || (type === 'put' && strike > price)) {
      return 'itm'; // In-the-Money
    }
    return 'otm'; // Out-of-the-Money
  };

  const getStatusColorClass = (status: 'itm' | 'atm' | 'otm') => {
    switch (status) {
      case 'itm':
        return 'bg-blue-100 dark:bg-blue-900/50';
      case 'atm':
        return 'bg-yellow-100 dark:bg-yellow-900/50';
      case 'otm':
        return 'bg-red-100 dark:bg-red-900/50';
      default:
        return '';
    }
  };


  const renderOptionsTable = (options: any[], type: 'call' | 'put') => (
    <div className="w-1/2 px-2">
      <h3 className="text-lg font-bold text-center mb-2">{type === 'call' ? 'اختیار خرید (Calls)' : 'اختیار فروش (Puts)'}</h3>
      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {allColumns.filter(c => visibleColumns[c.id]).map(col => <TableHead key={col.id}>{col.label}</TableHead>)}
              <TableHead className="text-center">قیمت اعمال</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((option) => {
               const status = getOptionStatus(type, option.strike);
               const colorClass = getStatusColorClass(status);
               return (
                <TableRow key={option.id} className={colorClass}> 
                    {allColumns.filter(c => visibleColumns[c.id]).map(col => <TableCell key={col.id}>{option[col.id]}</TableCell>)}
                    <TableCell className="font-semibold text-center bg-muted/50">{option.strike}</TableCell>
                </TableRow>
            )})}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>زنجیره اختیار معامله</CardTitle>
        <CardDescription>
          زنجیره های آپشن را بر اساس تاریخ سررسید مشاهده، مرتب و فیلتر کنید.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 p-4 border rounded-md bg-muted/50">
            <h4 className="font-semibold">فیلترها و نمایش</h4>
            <Separator orientation="vertical" className="h-10 hidden md:block" />
            <div className="flex items-center gap-2">
                <Label htmlFor="min-strike">از قیمت اعمال</Label>
                <Input id="min-strike" type="number" placeholder="مثال: 140" className="w-28" value={minStrike} onChange={e => setMinStrike(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
                <Label htmlFor="max-strike">تا قیمت اعمال</Label>
                <Input id="max-strike" type="number" placeholder="مثال: 160" className="w-28" value={maxStrike} onChange={e => setMaxStrike(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
                <Label>مرتب سازی بر اساس</Label>
                 <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="انتخاب ستون" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="strike">قیمت اعمال</SelectItem>
                        <SelectItem value="volume">حجم معاملات</SelectItem>
                        <SelectItem value="openInterest">موقعیت‌های باز</SelectItem>
                        <SelectItem value="impliedVol">نوسان ضمنی</SelectItem> 
                        <SelectItem value="delta">دلتا</SelectItem>
                        <SelectItem value="gamma">گاما</SelectItem>
                        <SelectItem value="vega">وگا</SelectItem>
                        <SelectItem value="theta">تتا</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <Separator orientation="vertical" className="h-10 hidden md:block" />
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        <FileCog className="ml-2 h-4 w-4" />
                        سفارشی سازی ستون‌ها
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {allColumns.map(col => (
                         <DropdownMenuCheckboxItem
                            key={col.id}
                            checked={visibleColumns[col.id]}
                            onCheckedChange={(checked) => setVisibleColumns(prev => ({...prev, [col.id]: checked}))}
                         >
                            {col.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <Tabs defaultValue={expirationDates[0]}>
          <TabsList>
            {expirationDates.map((date) => (
              <TabsTrigger key={date} value={date}>
                {new Date(date).toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })}
              </TabsTrigger>
            ))}
          </TabsList>
          {expirationDates.map((date) => {
            // Accessing contracts array within the "خودرو" key
            let chain = (optionChainsData.خودرو?.contracts || []).filter((c: any) => c.expiry === date);
            
            // Apply Filters
            if (minStrike) chain = chain.filter((c: any) => c.strike >= parseFloat(minStrike));
            if (maxStrike) chain = chain.filter((c: any) => c.strike <= parseFloat(maxStrike));

            // Apply Sorting
            chain.sort((a: any, b: any) => {
                if (sortBy === 'strike') return a.strike - b.strike;
                // For other numeric sorts
                return b[sortBy] - a[sortBy];
            });

            const calls = chain.filter((c: any) => c.type === 'call');
            const puts = chain.filter((c: any) => c.type === 'put');

            return (
              <TabsContent key={date} value={date}>
                <div className="flex w-full">
                  {renderOptionsTable(calls, 'call')}
                  {renderOptionsTable(puts, 'put')}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
        <Separator />
        <AnalyticalMetrics />
      </CardContent>
    </Card>
  );
}
