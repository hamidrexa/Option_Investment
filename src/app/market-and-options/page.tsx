import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptionChainTab } from "@/components/market-and-options/OptionChainTab";
import { MarketOverviewTab } from "@/components/market-and-options/MarketOverviewTab";
import { AnalyticalMetrics } from "@/components/market-and-options/AnalyticalMetrics";
import { SymbolsTab } from "@/components/market-and-options/SymbolsTab";
import { fetchSymbolContracts, Contract, ApiResponse } from "@/services/symbolService";
import symbolsData from "@/data/symbols.json";

interface Symbol {
  id: string;
  symbol: string;
}

export interface SymbolWithContracts {
  // CORRECT: Keep the id as a string for consistency
  id: string;
  symbol: string;
  contracts: Contract[];
  is_active: boolean;
  error: string | null;
}

export default async function MarketAndOptionsPage() {
  const symbols: Symbol[] = symbolsData;

  const symbolsWithContracts: SymbolWithContracts[] = await Promise.all(
    symbols.map(async (s) => {
      // REMOVED: const symbolId = parseInt(s.id, 10);
      let contractData: ApiResponse = { contracts: [], is_active: false };
      let error: string | null = null;

      try {
        // CORRECT: Pass the original string 's.id' directly to the service
        contractData = await fetchSymbolContracts(s.id);
      } catch (e: any) {
        console.error(`Error fetching contracts for ${s.symbol} (ID: ${s.id}):`, e);
        error = e.message || "خطا در بارگذاری قراردادها";
      }

      return {
        id: s.id, // CORRECT: Return the original string id
        symbol: s.symbol,
        contracts: contractData.contracts || [],
        is_active: contractData.is_active || false,
        error: error,
      };
    })
  );

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <Tabs defaultValue="market-overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="market-overview">دیده‌بان</TabsTrigger>
          <TabsTrigger value="symbols">نمادها</TabsTrigger>
          <TabsTrigger value="option-chain">زنجیره اختیار معامله</TabsTrigger>
          <TabsTrigger value="analytical-metrics">سنجه های تحلیلی</TabsTrigger>
        </TabsList>
        {/* Make sure SymbolsTab is also expecting id as a string */}
        <TabsContent value="symbols">
          <SymbolsTab symbolsWithContracts={symbolsWithContracts} />
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