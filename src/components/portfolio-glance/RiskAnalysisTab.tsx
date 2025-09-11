
"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import type { PortfolioSnapshot } from '@/types/domain';

interface RiskAnalysisTabProps {
    portfolio: PortfolioSnapshot;
}

// Mock data generation
const getIndustryConcentration = (positions: PortfolioSnapshot['positions']) => {
    // In a real app, this data would come from an API or be part of the position data
    const industryMap: { [key: string]: string } = {
        'فولاد': 'فلزات اساسی',
        'خودرو': 'خودرو و قطعات',
        'شستا': 'شرکت‌های چندرشته‌ای صنعتی',
    };

    const concentration: { [key: string]: number } = {};
    let totalValue = 0;
    positions.forEach(p => {
        totalValue += Math.abs(p.marketValue);
    });

    positions.forEach(p => {
        const industry = industryMap[p.underlying || p.symbol] || 'سایر';
        if (!concentration[industry]) {
            concentration[industry] = 0;
        }
        concentration[industry] += Math.abs(p.marketValue);
    });

    return Object.entries(concentration).map(([name, value]) => ({
        name,
        value: (value / totalValue) * 100,
    })).sort((a, b) => b.value - a.value);
};

const getUnderlyingConcentration = (positions: PortfolioSnapshot['positions']) => {
    const concentration: { [key: string]: { value: number, risk: number } } = {};
    let totalValue = 0;
    let totalRisk = 0; // Using absolute delta as a proxy for risk contribution

    positions.forEach(p => {
        totalValue += Math.abs(p.marketValue);
        totalRisk += Math.abs((p.greeks?.delta || 0) * (p.underlying ? 1 : p.quantity));
    });

    positions.forEach(p => {
        const underlying = p.underlying || p.symbol;
        if (!concentration[underlying]) {
            concentration[underlying] = { value: 0, risk: 0 };
        }
        concentration[underlying].value += Math.abs(p.marketValue);
        concentration[underlying].risk += Math.abs((p.greeks?.delta || 0) * (p.underlying ? 1 : p.quantity));
    });

    return Object.entries(concentration).map(([name, data]) => ({
        name,
        valuePercent: (data.value / totalValue) * 100,
        riskPercent: (data.risk / totalRisk) * 100,
    })).sort((a, b) => b.valuePercent - a.valuePercent);
};

const correlationData = [
  { name: 'فولاد', فولاد: 1, خودرو: 0.6, شستا: 0.4 },
  { name: 'خودرو', فولاد: 0.6, خودرو: 1, شستا: 0.8 },
  { name: 'شستا', فولاد: 0.4, خودرو: 0.8, شستا: 1 },
];


export default function RiskAnalysisTab({ portfolio }: RiskAnalysisTabProps) {
    const industryData = getIndustryConcentration(portfolio.positions);
    const underlyingData = getUnderlyingConcentration(portfolio.positions);
    const industryThreshold = 25; // User-defined threshold example
    const highConcentrationIndustry = industryData.find(i => i.value > industryThreshold);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>تمرکز بر اساس صنعت</CardTitle>
                    <CardDescription>درصد تخصیص پرتفوی به هر صنعت و هشدارهای مربوطه</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {highConcentrationIndustry && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>هشدار تمرکز بالا</AlertTitle>
                            <AlertDescription>
                                تمرکز شما در صنعت «{highConcentrationIndustry.name}» با <strong>{highConcentrationIndustry.value.toFixed(1)}%</strong> بیشتر از آستانه تعریف شده ({industryThreshold}%) است.
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        {industryData.map((item) => (
                            <div key={item.name} className="grid grid-cols-5 items-center gap-4">
                                <span className="col-span-1 text-sm font-medium">{item.name}</span>
                                <Progress value={item.value} className="col-span-3" />
                                <span className="col-span-1 text-sm font-semibold text-right">{item.value.toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>تمرکز بر اساس دارایی پایه</CardTitle>
                    <CardDescription>شناسایی دارایی‌های پایه‌ای که بخش بزرگی از ریسک یا ارزش پرتفوی را تشکیل می‌دهند.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>نحوه محاسبه</AlertTitle>
                        <AlertDescription>
                            درصد ریسک بر اساس مجموع قدرمطلق دلتای موقعیت‌های مرتبط با هر دارایی پایه محاسبه شده است.
                        </AlertDescription>
                    </Alert>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {underlyingData.map((item) => (
                            <Card key={item.name} className="flex flex-col justify-between p-4">
                                <h4 className="text-lg font-bold">{item.name}</h4>
                                <div className="space-y-2 mt-2">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>سهم از ارزش کل</span>
                                            <span>{item.valuePercent.toFixed(1)}%</span>
                                        </div>
                                        <Progress value={item.valuePercent} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>سهم از ریسک (دلتا)</span>
                                            <span>{item.riskPercent.toFixed(1)}%</span>
                                        </div>
                                        <Progress value={item.riskPercent} className="[&>div]:bg-destructive" />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>تحلیل همبستگی (Correlation Analysis)</CardTitle>
                    <CardDescription>ماتریس همبستگی بین بازدهی دارایی‌های مختلف پرتفوی (داده‌های شبیه‌سازی شده)</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        اعداد نزدیک به ۱ نشان‌دهنده همبستگی مثبت بالا (حرکت در یک جهت) و اعداد نزدیک به ۱- نشان‌دهنده همبستگی منفی بالا (حرکت در خلاف جهت) هستند.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="p-2 border">دارایی</th>
                                    {correlationData.map(c => <th key={c.name} className="p-2 border">{c.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {correlationData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="p-2 border font-semibold bg-muted">{row.name}</td>
                                        {Object.keys(row).filter(k => k !== 'name').map((key, colIndex) => {
                                            const value = (row as any)[key];
                                            let bgColor = 'bg-transparent';
                                            if (value > 0.7 && value < 1) bgColor = 'bg-emerald-200/50 dark:bg-emerald-800/50';
                                            if (value < -0.7) bgColor = 'bg-red-200/50 dark:bg-red-800/50';
                                            if (value === 1) bgColor = 'bg-accent';

                                            return (
                                                <td key={`${rowIndex}-${colIndex}`} className={`p-2 border ${bgColor} transition-colors`}>
                                                    {value.toFixed(2)}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
