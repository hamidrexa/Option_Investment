import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BotsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Bots / Strategy Studio</h2>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will allow you to create, backtest, and run automated trading strategies.</p>
        </CardContent>
      </Card>
    </div>
  );
}
