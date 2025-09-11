'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SentimentTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>تحلیل سنتیمنت بازار</CardTitle>
          <CardDescription>نمودارها و اطلاعات مربوط به سنتیمنت بازار در اینجا نمایش داده خواهد شد.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold">به زودی</h2>
            <p>این بخش در حال توسعه است و به زودی فعال خواهد شد.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
