
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SymbolDetailsModal } from "./SymbolDetailsModal";
import { Contract } from "@/services/symbolService";
import { Button } from "../ui/button";

interface SymbolCardProps {
  symbol: {
    id: number;
    symbol: string;
  };
  contracts: Contract[];
  error: string | null; // Add error prop
}

const SymbolCard = ({ symbol, contracts, error }: SymbolCardProps) => {
  const nonExpiredCount = contracts.filter((c) => !c.is_expired).length;

  return (
    <SymbolDetailsModal symbolName={symbol.symbol} contracts={contracts}>
      <Card className="w-full hover:shadow-lg transition-shadow duration-300 cursor-pointer" dir="rtl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">
            {symbol.symbol}
          </CardTitle>
          {error ? (
            <Badge variant="destructive">خطا</Badge>
          ) : (
            <Badge variant="outline">
              فعال: {nonExpiredCount}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p>
                برای مشاهده جزئیات قراردادها کلیک کنید.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </SymbolDetailsModal>
  );
};

export default SymbolCard;
