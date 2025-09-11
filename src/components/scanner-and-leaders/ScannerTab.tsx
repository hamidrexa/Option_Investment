'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ScannerTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>اسکنر هوشمند فرصت‌ها</CardTitle>
          <CardDescription>کاربر بتواند معيارهاي استراتژي خود را تعريف كند و سيستم به صورت هوشمند كل زنجيره را اسكن كرده و قراردادهاي منطبق را معرفى نمايد.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold">به زودی</h2>
            <p>در این بخش، کاربر می‌تواند معیارهای استراتژی خود را تعریف کرده و سیستم به صورت هوشمند کل زنجیره را اسکن کرده و قراردادهای منطبق را معرفی نماید.</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>تحلیل هوشمند جریان سفارشات غیر عادی</CardTitle>
          <CardDescription>الگوریتمهای هوش مصنوعی فعالیتهای غیر عادی (مانند خریدهای سنگین و ناگهانی) را شناسایی و به کاربر اعلان می دهند.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold">به زودی</h2>
            <p>در این بخش، الگوریتم‌های هوش مصنوعی فعالیت‌های غیرعادی (مانند خریدهای سنگین و ناگهانی) را شناسایی و به کاربر اعلان می‌دهند.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
