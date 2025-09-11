import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PnLPage({ params }: { params: { portfolioId: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">P&amp;L Report</h2>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will display historical P&amp;L and detailed performance reports for portfolio {params.portfolioId}.</p>
        </CardContent>
      </Card>
    </div>
  );
}
