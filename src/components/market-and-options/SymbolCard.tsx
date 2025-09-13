
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ApiResponse, Contract, fetchSymbolContracts } from "@/services/symbolService";

interface Symbol {
  id: string;
  symbol: string;
}

const SymbolCard = ({ symbol }: { symbol: Symbol }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchContractData = async () => {
    // Prevent refetching if data exists or is loading
    if (data || loading) return;

    setLoading(true);
    setError(null);
    try {
      const result = await fetchSymbolContracts(symbol.id);
      setData(result);
    } catch (e) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const nonExpiredContractsCount =
    data?.contracts.filter((c: Contract) => !c.is_expired).length || 0;

  return (
    <Card className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value={symbol.symbol}>
          <AccordionTrigger onClick={handleFetchContractData}>
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold text-lg">{symbol.symbol}</span>
              {loading ? (
                <Badge variant="secondary">Loading...</Badge>
              ) : (
                <Badge>{`${nonExpiredContractsCount} non-expired contracts`}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {error && <p className="text-red-500 p-4">{error}</p>}
            {data && (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                <h4 className="font-semibold mb-2">Contract Details:</h4>
                <ul className="space-y-2">
                  {data.contracts.map((contract: Contract, index: number) => (
                    <li
                      key={index}
                      className={`p-2 rounded-md ${
                        contract.is_expired
                          ? "bg-red-100 dark:bg-red-900"
                          : "bg-green-100 dark:bg-green-900"
                      }`}
                    >
                      <p>
                        <strong>Expire Date:</strong>{" "}
                        {new Date(contract.expire_date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Is Expired:</strong>{" "}
                        {contract.is_expired ? "Yes" : "No"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default SymbolCard;
