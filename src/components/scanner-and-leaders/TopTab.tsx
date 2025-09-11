'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function TopTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>برترین داراییهای پایه</CardTitle>
          <CardDescription>مرتب سازی بر اساس بيشترين حجم و ارزش معاملات در بازار سهام و آپشن های مرتبط.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold">به زودی</h2>
            <p>در این بخش، برترین دارایی‌های پایه بر اساس بیشترین حجم و ارزش معاملات در بازار سهام و آپشن‌های مرتبط مرتب‌سازی می‌شوند.</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>برترین نمادهای آپشن</CardTitle>
          <CardDescription>لیستی از نمادها بر اساس بيشترين حجم و ارزش معاملات، بيشترين افزايش در موقعیتهای باز و بيشترين نوسانات قيمتي .</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold">به زودی</h2>
            <p>در این بخش، لیستی از نمادها بر اساس بیشترین حجم و ارزش معاملات، بیشترین افزایش در موقعیت‌های باز و بیشترین نوسانات قیمتی ارائه می‌شود.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
