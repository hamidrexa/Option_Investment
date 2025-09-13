
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SymbolDetailsModal } from "./SymbolDetailsModal";
import { Contract, fetchSymbolContracts } from "@/services/symbolService";
import { useState } from "react";
import { SymbolWithContracts } from "@/app/market-and-options/page";

interface SymbolCardProps {
  symbolData: SymbolWithContracts;
}

const SymbolCard = ({ symbolData }: SymbolCardProps) => {
  const [contracts, setContracts] = useState<Contract[]>(symbolData.contracts);
  const [error, setError] = useState<string | null>(symbolData.error);
  const [isLoading, setIsLoading] = useState(false);
  
  const nonExpiredCount = contracts.filter((c) => !c.is_expired).length;

  const handleCardClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const freshData = await fetchSymbolContracts(symbolData.id);
      setContracts(freshData.contracts);
    } catch (e) {
      setError("خطا در بروزرسانی اطلاعات.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div onClick={handleCardClick}>
      <SymbolDetailsModal
        symbolId={symbolData.id}
        symbolName={symbolData.symbol}
        initialContracts={contracts}
      >
        <Card
          className="w-full hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          dir="rtl"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">
              {symbolData.symbol}
            </CardTitle>
            {isLoading ? (
              <Badge variant="secondary">در حال بروزرسانی...</Badge>
            ) : error ? (
              <Badge variant="destructive">خطا</Badge>
            ) : (
              <Badge variant="outline">فعال: {nonExpiredCount}</Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <p>برای مشاهده جزئیات قراردادها کلیک کنید.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </SymbolDetailsModal>
    </div>
  );
};

export default SymbolCard;
