'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Import Recharts components directly for diagnostic purposes
import { AreaChart, Bar, CartesianGrid, ComposedChart, Line, LineChart, XAxis, YAxis, Area, Tooltip, Legend } from 'recharts';

// Temporarily commenting out custom Chart components for diagnostic
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartLegend,
//   ChartLegendContent,
// } from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
};


export function AnalyticalMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>شاخص ترس و طمع</CardTitle>
        </CardHeader>
        <CardContent>
            {/* Placeholder for Fear & Greed Index */}
            <div className="h-48 flex items-center justify-center text-muted-foreground">نمودار در این بخش قرار می‌گیرد</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>نسبت Put/Call</CardTitle>
        </CardHeader>
        <CardContent>
            {/* Directly rendering Recharts components with fixed dimensions for diagnosis */}
            <div style={{ width: '100%', height: 200 }}>
                 <ComposedChart width={500} height={200} data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis />
                    <Tooltip /> 
                    <Legend /> 
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" />
                </ComposedChart>
            </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>روند موقعیت‌های باز آپشن</CardTitle>
        </CardHeader>
        <CardContent>
             <div style={{ width: '100%', height: 200 }}>
                <AreaChart width={500} height={200} accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis />
                    <Tooltip /> 
                    <Legend /> 
                    <Area type="monotone" dataKey="desktop" fill="var(--color-desktop)" stroke="var(--color-desktop)" />
                </AreaChart>
            </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>ارزش معاملات آپشن در مقابل بازار اصلی</CardTitle>
        </CardHeader>
        <CardContent>
             <div style={{ width: '100%', height: 200 }}>
                 <LineChart width={500} height={200} data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis />
                    <Tooltip /> 
                    <Legend /> 
                    <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" />
                     <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" />
                </LineChart>
            </div>
        </CardContent>
      </Card>
        <Card>
        <CardHeader>
          <CardTitle>شاخص Covered Call</CardTitle>
        </CardHeader>
        <CardContent>
            {/* Placeholder for Covered Call Index */}
            <div className="h-48 flex items-center justify-center text-muted-foreground">نمودار در این بخش قرار می‌گیرد</div>
        </CardContent>
      </Card>
        <Card>
        <CardHeader>
          <CardTitle>شاخص Call/Put Parity</CardTitle>
        </CardHeader>
        <CardContent>
            {/* Placeholder for Call/Put Parity Index */}
            <div className="h-48 flex items-center justify-center text-muted-foreground">نمودار در این بخش قرار می‌گیرد</div>
        </CardContent>
      </Card>
    </div>
  );
}
