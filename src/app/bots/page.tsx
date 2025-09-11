import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BotsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">ربات‌ها / استودیو استراتژی</h2>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>به زودی</CardTitle>
        </CardHeader>
        <CardContent>
          <p>این بخش به شما امکان ایجاد، بک‌تست و اجرای استراتژی‌های معاملاتی خودکار را می‌دهد.</p>
        </CardContent>
      </Card>
    </div>
  );
}
