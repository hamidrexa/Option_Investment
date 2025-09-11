'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, ComposedChart, Line, Area, XAxis, YAxis, AreaChart } from 'recharts';

// Mock data for charts
const priceHistoryData = [
  { date: '2024-01-01', close: 1200, volume: 15000 },
  { date: '2024-01-02', close: 1250, volume: 17000 },
  { date: '2024-01-03', close: 1220, volume: 16000 },
  { date: '2024-01-04', close: 1280, volume: 18000 },
  { date: '2024-01-05', close: 1300, volume: 19000 },
  { date: '2024-01-06', close: 1310, volume: 20000 },
];

const openInterestData = [
  { date: '2024-01-01', openInterest: 50000, optionVolume: 5000 },
  { date: '2024-01-02', openInterest: 52000, optionVolume: 5500 },
  { date: '2024-01-03', openInterest: 51000, optionVolume: 5200 },
  { date: '2024-01-04', openInterest: 55000, optionVolume: 6000 },
  { date: '2024-01-05', openInterest: 58000, optionVolume: 6500 },
  { date: '2024-01-06', openInterest: 60000, optionVolume: 7000 },
];

const chartConfig = {
    close: {
        label: "Price",
        color: "hsl(var(--chart-1))",
    },
    volume: {
        label: "Volume",
        color: "hsl(var(--chart-2))",
    },
    openInterest: {
        label: "Open Interest",
        color: "hsl(var(--chart-3))",
    },
    optionVolume: {
        label: "Option Volume",
        color: "hsl(var(--chart-4))",
    },
};

export function MarketOverviewTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>شاخص های کلیدی بازار</CardTitle>
          <CardDescription>نمایش لحظه ای شاخص کل و شاخص های صنایع منتخب.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>شاخص کل</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2,345,678</p>
                <p className="text-sm text-green-500">+1.25%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ارزش کل معاملات (خرد و کلان)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1,234 B</p>
                <p className="text-sm text-red-500">-0.5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ارزش معاملات آپشن</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">567 M</p>
                <p className="text-sm text-green-500">+2.1%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>شاخص صنعت خودرو</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1,234,567</p>
                <p className="text-sm text-green-500">+0.8%</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>تاریخچه قیمت و ارزش معاملات</CardTitle>
          <CardDescription>ارائه نمودارهای خطی و کندل استیک براي تاريخچه قيمت و ارزش معاملات دارايي هاي پايه وشاخصها با قابليت افزودن اندیکاتورهای تکنیکال رایج.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ComposedChart data={priceHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="var(--color-close)"/>
                <YAxis yAxisId="right" orientation="right" stroke="var(--color-volume)"/>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
                <Bar yAxisId="right" dataKey="volume" fill="var(--color-volume)" />
                <Line yAxisId="left" type="monotone" dataKey="close" stroke="var(--color-close)" />
              </ComposedChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>تاریخچه موقعیت‌های باز و حجم معاملات آپشن</CardTitle>
          <CardDescription>نمودار تاریخچه تعداد کل موقعیتهای باز (Open Interest) و حجم معاملات در کل بازار آپشن.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
             <ChartContainer config={chartConfig} className="h-full w-full">
              <ComposedChart data={openInterestData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" />
                 <YAxis yAxisId="left" orientation="left" stroke="var(--color-openInterest)"/>
                <YAxis yAxisId="right" orientation="right" stroke="var(--color-optionVolume)"/>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
                <Bar yAxisId="right" dataKey="optionVolume" fill="var(--color-optionVolume)" />
                <Line yAxisId="left" type="monotone" dataKey="openInterest" stroke="var(--color-openInterest)" />
              </ComposedChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
