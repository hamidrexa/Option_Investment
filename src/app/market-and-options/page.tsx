'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptionChainTab } from "@/components/market-and-options/OptionChainTab";
import { MarketOverviewTab } from "@/components/market-and-options/MarketOverviewTab";
import { AnalyticalMetrics } from "@/components/market-and-options/AnalyticalMetrics";

export default function MarketAndOptionsPage() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="market-overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="market-overview">دیده‌بان</TabsTrigger>
          <TabsTrigger value="option-chain">زنجیره اختیار معامله</TabsTrigger>
          <TabsTrigger value="analytical-metrics">سنجه های تحلیلی</TabsTrigger>
        </TabsList>
        <TabsContent value="market-overview">
          <MarketOverviewTab />
        </TabsContent>
        <TabsContent value="option-chain">
          <OptionChainTab />
        </TabsContent>
        <TabsContent value="analytical-metrics">
            <AnalyticalMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
