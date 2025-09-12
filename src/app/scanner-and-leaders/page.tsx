'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScannerTab } from "@/components/scanner-and-leaders/ScannerTab";
import { TopTab } from "@/components/scanner-and-leaders/TopTab";

export default function ScannerAndLeadersPage() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="scanner">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scanner">اسکنر</TabsTrigger>
          <TabsTrigger value="top">برترین ها</TabsTrigger>
        </TabsList>
        <TabsContent value="scanner">
          <ScannerTab />
        </TabsContent>
        <TabsContent value="top">
          <TopTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
