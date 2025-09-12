'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatisticalTab } from "@/components/statistical-analysis/StatisticalTab";
import { SentimentTab } from "@/components/statistical-analysis/SentimentTab";

export default function StatisticalAnalysisPage() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="statistical">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="statistical">آماری</TabsTrigger>
          <TabsTrigger value="sentiment">سنتیمنت</TabsTrigger>
        </TabsList>
        <TabsContent value="statistical">
          <StatisticalTab />
        </TabsContent>
        <TabsContent value="sentiment">
          <SentimentTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
