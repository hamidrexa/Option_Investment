import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contract, ContractDetail, fetchContractDetails } from "@/services/symbolService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRightIcon } from "lucide-react";

interface SymbolDetailsModalProps {
  symbolId: string;
  symbolName: string;
  initialContracts: Contract[];
  children: React.ReactNode;
}

export function SymbolDetailsModal({
  symbolId,
  symbolName,
  initialContracts,
  children,
}: SymbolDetailsModalProps) {
  const [view, setView] = useState<'list' | 'details'>('list');
  const [details, setDetails] = useState<ContractDetail[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- THE FIX IS INSIDE THIS FUNCTION ---
  const handleDateSelect = async (contract: Contract) => {
    setIsLoading(true);
    setError(null);

    // --- FIX STARTS HERE ---
    // 1. Create a JavaScript Date object from the ISO string.
    const dateObject = new Date(contract.expire_date);

    // 2. Extract the year, month, and day.
    //    getMonth() is 0-indexed (Jan=0), so we add 1.
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    // 3. Create the new date string in the required "YYYY-M-D" format.
    const formattedExpireDate = `${year}-${month}-${day}`;
    // --- FIX ENDS HERE ---

    try {
      // 4. Use the newly formatted date in the API call.
      const result = await fetchContractDetails(symbolId, formattedExpireDate);
      setDetails(result);
      setView('details');
    } catch (e) {
      setError("خطا در دریافت جزئیات قرارداد. لطفاً دوباره تلاش کنید.");
      setDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToList = () => {
    setView('list');
    setDetails(null);
    setError(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>
            {view === 'list'
              ? `قراردادهای نماد ${symbolName}`
              : `جزئیات قرارداد ${symbolName}`}
          </DialogTitle>
        </DialogHeader>

        {view === 'list' && (
          <ScrollArea className="h-96 w-full rounded-md border p-4">
            <div className="grid gap-4 py-4">
              {initialContracts.length > 0 ? (
                initialContracts.map((contract, index) => (
                  <div
                    key={index}
                    onClick={() => handleDateSelect(contract)}
                    className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">تاریخ انقضا:</span>
                      <span>
                        {new Date(contract.expire_date).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                    <Badge variant={contract.is_expired ? "destructive" : "default"}>
                      {contract.is_expired ? "منقضی شده" : "فعال"}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">قراردادی برای نمایش وجود ندارد.</p>
              )}
            </div>
          </ScrollArea>
        )}
        
        {view === 'details' && (
           <div className="p-4">
            <Button onClick={handleBackToList} variant="outline" className="mb-4">
                <ArrowRightIcon className="ml-2 h-4 w-4" /> بازگشت به لیست
            </Button>
            {isLoading && <p className="text-center">در حال بارگذاری جزئیات...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!isLoading && !error && details && details.length > 0 && (
              <ScrollArea className="h-80">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">عنوان</TableHead>
                      <TableHead className="text-right">مقدار</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.map((detail, index) => (
                      Object.entries(detail).map(([key, value]) => (
                        <TableRow key={`${index}-${key}`}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{String(value)}</TableCell>
                        </TableRow>
                      ))
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
             {!isLoading && !error && (!details || details.length === 0) && (
              <p className="text-center text-gray-500">جزئیاتی برای نمایش وجود ندارد.</p>
            )}
           </div>
        )}

        <DialogFooter>
          <Button type="button" onClick={() => (document.querySelector('[data-state="open"]') as HTMLElement)?.click()}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}