
'use client';

import { useState, useEffect } from "react";
import SymbolCard from "./SymbolCard";
import { fetchSymbolContracts, Contract } from "@/services/symbolService";
import symbolsData from "@/data/symbols.json";
import { Skeleton } from "@/components/ui/skeleton";

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

export const SymbolsTab = () => {
  const [symbolsWithContracts, setSymbolsWithContracts] = useState<SymbolWithContracts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      const symbols: Symbol[] = symbolsData;
      const allSymbolsData = await Promise.all(
        symbols.map(async (s) => {
          try {
            const data = await fetchSymbolContracts(s.id);
            return {
              id: s.id,
              symbol: s.symbol,
              contracts: data.contracts,
              is_active: data.is_active,
              error: null,
            };
          } catch (e: any) {
            return {
              id: s.id,
              symbol: s.symbol,
              contracts: [],
              is_active: false,
              error: e.message || "Failed to fetch initial data.",
            };
          }
        })
      );
      setSymbolsWithContracts(allSymbolsData);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4" dir="rtl">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
      </div>
    );
  }

  if (!symbolsWithContracts || symbolsWithContracts.length === 0) {
    return <p className="text-center text-gray-500 p-4" dir="rtl">نمادی برای نمایش یافت نشد.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4" dir="rtl">
      {symbolsWithContracts.map((symbolData) => (
        <SymbolCard
          key={symbolData.id}
          symbolData={symbolData}
        />
      ))}
    </div>
  );
};
