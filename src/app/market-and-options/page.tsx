'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptionChainTab } from "@/components/market-and-options/OptionChainTab";
import { MarketOverviewTab } from "@/components/market-and-options/MarketOverviewTab";
import { AnalyticalMetrics } from "@/components/market-and-options/AnalyticalMetrics";
import { SymbolsTab } from "@/components/market-and-options/SymbolsTab";

export default function MarketAndOptionsPage() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="market-overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytical-metrics">سنجه های تحلیلی</TabsTrigger>
          <TabsTrigger value="option-chain">زنجیره اختیار معامله</TabsTrigger>
          <TabsTrigger value="symbols">نمادها</TabsTrigger>
          <TabsTrigger value="market-overview">دیده‌بان</TabsTrigger>
        </TabsList>
        <TabsContent value="market-overview">
          <MarketOverviewTab />
        </TabsContent>
        <TabsContent value="symbols">
          <SymbolsTab />
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
