
'use client';

import { BarChart, LineChart, Activity, TrendingUp, TrendingDown, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, Line, XAxis, YAxis, Tooltip, Legend, LineChart as RechartsLineChart } from 'recharts';

const mockData = [
  { name: '10:00', value: 2150000 },
  { name: '10:30', value: 2152000 },
  { name: '11:00', value: 2148000 },
  { name: '11:30', value: 2155000 },
  { name: '12:00', value: 2153000 },
  { name: '12:30', value: 2156000 },
];

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('fa-IR').format(value);
};


export default function MarketAndOptionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">دیده‌بان و زنجیره آپشن</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" dir="rtl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">نمای کلی بازار</TabsTrigger>
          <TabsTrigger value="option-chain">زنجیره اختیار معامله</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">شاخص کل</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">۲,۱۵۶,۱۲۳</div>
                      <p className="text-xs text-emerald-500/80 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>+۰.۱۲٪</span>
                      </p>
                  </CardContent>
              </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">ارزش معاملات آپشن</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">۵۴۰ میلیارد ریال</div>
                       <p className="text-xs text-red-500/80 flex items-center gap-1">
                          <TrendingDown className="h-3 w-3" />
                          <span>-۳.۵٪</span>
                      </p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">موقعیت‌های باز</CardTitle>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">۱,۲۳۴,۵۶۷</div>
                      <p className="text-xs text-muted-foreground">نسبت به روز گذشته</p>
                  </CardContent>
              </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">ارزش معاملات پایه</CardTitle>
                      <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">۸,۲۰۰ میلیارد ریال</div>
                      <p className="text-xs text-muted-foreground">آخرین به‌روزرسانی: ۲ دقیقه پیش</p>
                  </CardContent>
              </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>روند شاخص کل</CardTitle>
                  <CardDescription>نمودار روند شاخص کل در روز جاری</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={mockData}>
                      <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => formatNumber(value)} domain={['dataMin - 1000', 'dataMax + 1000']} />
                      <Tooltip
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                            direction: 'rtl'
                        }}
                        formatter={(value: number) => [formatNumber(value), 'مقدار']}
                      />
                      <Legend wrapperStyle={{direction: 'rtl'}} />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" name="شاخص کل" strokeWidth={2} dot={false} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>روند موقعیت‌های باز (Open Interest)</CardTitle>
                   <CardDescription>تاریخچه تعداد کل موقعیت‌های باز در بازار آپشن</CardDescription>
                </CardHeader>
                 <CardContent>
                    <p className="text-center text-muted-foreground py-20">نمودار به زودی اضافه می‌شود</p>
                </CardContent>
              </Card>
          </div>
        </TabsContent>

        <TabsContent value="option-chain">
           <Card>
            <CardHeader>
              <CardTitle>زنجیره اختیار معامله</CardTitle>
               <CardDescription>این بخش به زودی شامل یک زنجیره آپشن کامل و تعاملی خواهد شد.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground py-20">به زودی...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
