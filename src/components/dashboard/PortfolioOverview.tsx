'use client';

import { useDemo } from '@/hooks/useDemo';
import KeyMetricsDisplay from '@/components/dashboard/KeyMetricsDisplay';
import HoldingsTable from '@/components/dashboard/HoldingsTable';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function PortfolioOverview() {
  const { portfolio, isLoading, error } = useDemo();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-1/4" />
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
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || 'Could not load portfolio data. Please try again later.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">{portfolio.name}</h2>
      </div>
      <KeyMetricsDisplay portfolio={portfolio} />
      <div className="grid grid-cols-1 gap-6">
        <HoldingsTable data={portfolio.positions} />
      </div>
    </div>
  );
}
