import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PnLPage({ params }: { params: { portfolioId: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">گزارش سود و زیان</h2>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>به زودی</CardTitle>
        </CardHeader>
        <CardContent>
          <p>این بخش سود و زیان تاریخی و گزارش‌های عملکرد دقیق برای پرتفوی {params.portfolioId} را نمایش خواهد داد.</p>
        </CardContent>
      </Card>
    </div>
  );
}
