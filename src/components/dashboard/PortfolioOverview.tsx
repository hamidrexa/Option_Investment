'use client';

import { useDemo } from '@/hooks/useDemo';
import KeyMetricsDisplay from '@/components/dashboard/KeyMetricsDisplay';
import HoldingsTable from '@/components/dashboard/HoldingsTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';


export default function PortfolioOverview() {
  const { portfolio, isLoading, error } = useDemo();

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
     <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>خطا</AlertTitle>
            <AlertDescription>
            {error || 'امکان بارگذاری داده‌های پورتفولیو وجود ندارد. لطفاً بعداً دوباره امتحان کنید.'}
            </AlertDescription>
        </Alert>
     </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">داشبورد</h2>
            <p className="text-muted-foreground">
                نمای کلی از پرتفوی <span className="font-semibold">{portfolio.name}</span>
            </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <KeyMetricsDisplay portfolio={portfolio} />
        <Card>
            <CardHeader>
                <CardTitle>دارایی‌های شما</CardTitle>
                <CardDescription>
                    لیست کامل دارایی‌های مشتقه و پایه در پرتفوی شما.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <HoldingsTable data={portfolio.positions} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
