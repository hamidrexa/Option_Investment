
'use client';

import SymbolCard from "./SymbolCard";
import { SymbolWithContracts } from "@/app/market-and-options/page";

interface SymbolsTabProps {
  symbolsWithContracts: SymbolWithContracts[];
}

export const SymbolsTab = ({ symbolsWithContracts }: SymbolsTabProps) => {
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
