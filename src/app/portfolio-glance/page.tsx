
'use client';

import { useDemo } from '@/hooks/useDemo';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AllocationTreemap from '@/components/portfolio-glance/AllocationTreemap';
import StrategyPieChart from '@/components/portfolio-glance/StrategyPieChart';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function PortfolioGlancePage() {
  const { portfolio, isLoading, error } = useDemo();

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>خطا</AlertTitle>
        <AlertDescription>
          {error || 'امکان بارگذاری داده‌های پورتفولیو وجود ندارد. لطفاً بعداً دوباره امتحان کنید.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">سبد در یک نگاه</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ارزش کل (آخرین قیمت)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(portfolio.totalValue)}</div>
             <p className="text-xs text-muted-foreground">بر اساس آخرین قیمت معاملات</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ارزش کل (قیمت پایانی)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(portfolio.totalValueAtClose)}</div>
             <p className="text-xs text-muted-foreground">بر اساس قیمت پایانی روز گذشته</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>نقشه سبد بر اساس تخصیص دارایی</CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationTreemap data={portfolio.positions} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>نقشه سبد بر اساس استراتژی</CardTitle>
          </CardHeader>
          <CardContent>
             <StrategyPieChart data={portfolio.strategies} portfolioValue={portfolio.totalValue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
