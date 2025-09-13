
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SymbolDetailsModal } from "./SymbolDetailsModal";
import { Contract } from "@/services/symbolService";
import { useState } from "react";
import { SymbolWithContracts } from "@/app/market-and-options/page";

interface SymbolCardProps {
  symbolData: SymbolWithContracts;
}

const SymbolCard = ({ symbolData }: SymbolCardProps) => {
  // NOTE: The contracts are now managed inside the modal to ensure fresh data on open.
  const [nonExpiredCount] = useState(
    symbolData.contracts.filter((c) => !c.is_expired).length
  );
  const [error] = useState<string | null>(symbolData.error);
  const [isLoading] = useState(false); // Loading is also managed inside modal

  return (
    <SymbolDetailsModal
      symbolId={symbolData.id}
      symbolName={symbolData.symbol}
      initialContracts={symbolData.contracts}
      initialError={symbolData.error}
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
  );
};

export default SymbolCard;
