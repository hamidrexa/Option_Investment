
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptionChainTab } from "@/components/market-and-options/OptionChainTab";
import { MarketOverviewTab } from "@/components/market-and-options/MarketOverviewTab";
import { AnalyticalMetrics } from "@/components/market-and-options/AnalyticalMetrics";
import { SymbolsTab } from "@/components/market-and-options/SymbolsTab";
import { fetchSymbolContracts, Contract } from "@/services/symbolService";
import symbolsData from "@/data/symbols.json";

interface Symbol {
  id: string;
  symbol: string;
}

export interface SymbolWithContracts {
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
      let contracts: Contract[] = [];
      let isActive = false;
      let error: string | null = null;
      
      try {
        const data = await fetchSymbolContracts(s.id);
        contracts = data.contracts;
        isActive = data.is_active;
      } catch (e: any) {
        error = e.message || "Failed to fetch initial data.";
      }
      
      return {
        id: s.id,
        symbol: s.symbol,
        contracts: contracts,
        is_active: isActive,
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
        <TabsContent value="market-overview">
          <MarketOverviewTab />
        </TabsContent>
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
