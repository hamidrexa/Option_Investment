import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OptionChainPage({ params }: { params: { symbol: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">زنجیره اختیار معامله: {params.symbol.toUpperCase()}</h2>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>به زودی</CardTitle>
        </CardHeader>
        <CardContent>
          <p>این بخش زنجیره کامل اختیار معامله برای نماد {params.symbol.toUpperCase()} را نمایش خواهد داد، شامل آکاردئون تاریخ انقضا، نردبان قیمت اعمال و فرم ثبت سفارش.</p>
        </CardContent>
      </Card>
    </div>
  );
}
