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
import { PieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// Mock data
const openInterestData = [
  { name: 'ITM Calls', value: 400 },
  { name: 'OTM Calls', value: 300 },
  { name: 'ITM Puts', value: 200 },
  { name: 'OTM Puts', value: 500 },
];

const putCallRatioData = [
    { date: '2024-01-01', ratio: 0.8 },
    { date: '2024-01-02', ratio: 0.85 },
    { date: '2024-01-03', ratio: 0.78 },
    { date: '2024-01-04', ratio: 0.9 },
    { date: '2024-01-05', ratio: 0.92 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const chartConfig = {
    ratio: {
        label: "Put/Call Ratio",
        color: "hsl(var(--chart-1))",
    },
};

export function StatisticalTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>تحليل موقعيت هاى باز (Open Interest Analysis)</CardTitle>
          <CardDescription>ارائه نمودارهای دایره ای و خطی برای نمايش تعداد موقعيت هاي باز به تفكيك "در سود (ITM) "و"در زيان (OTM)" برای قراردادهای خريد و فروش.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">موقعیت‌های باز خرید</h3>
              <ChartContainer config={{}} className="h-[250px] w-full">
                  <PieChart width={250} height={250}>
                      <Pie data={openInterestData.filter(d => d.name.includes("Call"))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                          {openInterestData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend />
                  </PieChart>
              </ChartContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">موقعیت‌های باز فروش</h3>
              <ChartContainer config={{}} className="h-[250px] w-full">
                  <PieChart width={250} height={250}>
                       <Pie data={openInterestData.filter(d => d.name.includes("Put"))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                          {openInterestData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend />
                  </PieChart>
              </Container>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>نسبت هاى تحليلى (Ratio Analysis)</CardTitle>
          <CardDescription>محاسبه و ارائە نمودار تاریخچه نسبت Put/Call بر اساس حجم معاملات و تعداد موقعیتهای باز.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[300px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart data={putCallRatioData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend />
                        <Line type="monotone" dataKey="ratio" stroke="var(--color-ratio)" />
                    </LineChart>
                </ChartContainer>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ارزش مفهومى (Notional Value)</CardTitle>
          <CardDescription>محاسبه و نمایش ارزش مفهومى معاملات جهت درک حجم واقعي سرمايه درگير.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-4xl font-bold">1,234,567,890 B</p>
            <p className="text-sm text-muted-foreground">ارزش کل مفهومی معاملات</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
