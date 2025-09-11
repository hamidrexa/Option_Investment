'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Scale } from 'lucide-react';
import type { PortfolioSnapshot } from '@/types/domain';

interface KeyMetricsDisplayProps {
  portfolio: PortfolioSnapshot;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

export default function KeyMetricsDisplay({ portfolio }: KeyMetricsDisplayProps) {
  const { totalValue, totalPnL, totalPnLPercent, marginUsed } = portfolio;
  const isPnlPositive = totalPnL >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          <p className="text-xs text-muted-foreground">Updated just now</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
          {isPnlPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPnlPositive ? 'text-green-500' : 'text-red-500'}`}>
            {formatCurrency(totalPnL)}
          </div>
          <p className={`text-xs ${isPnlPositive ? 'text-green-500/80' : 'text-red-500/80'}`}>
            {formatPercentage(totalPnLPercent)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Margin Used</CardTitle>
          <Scale className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(marginUsed)}</div>
          <p className="text-xs text-muted-foreground">
            {formatPercentage((marginUsed / totalValue) * 100)} of total value
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cash</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(portfolio.cash)}</div>
           <p className="text-xs text-muted-foreground">
            {formatPercentage((portfolio.cash / totalValue) * 100)} of total value
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
