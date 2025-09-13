
import SymbolCard from "./SymbolCard";
import symbolsData from "../../data/symbols.json";

interface Symbol {
  id: string;
  symbol: string;
}

export const SymbolsTab = () => {
  const symbols: Symbol[] = symbolsData;

  if (!symbols || symbols.length === 0) {
    return <p className="text-red-500">Could not load symbols or no symbols found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {symbols.map((symbol) => (
        <SymbolCard key={symbol.id} symbol={symbol} />
      ))}
    </div>
  );
};
