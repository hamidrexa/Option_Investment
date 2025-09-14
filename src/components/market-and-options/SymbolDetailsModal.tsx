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
import { Contract, fetchSymbolContracts } from "@/services/symbolService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useOptionChain } from "@/context/OptionChainContext";

interface SymbolDetailsModalProps {
  symbolId: string;
  symbolName: string;
  initialContracts: Contract[];
  initialError: string | null;
  children: React.ReactNode;
}

export function SymbolDetailsModal({
  symbolId,
  symbolName,
  initialContracts,
  initialError,
  children,
}: SymbolDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [isListLoading, setIsListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(initialError);
  
  const { fetchOptionChain, setActiveTab } = useOptionChain();

  const activeContracts = contracts.filter(contract => !contract.is_expired);
  const expiredContracts = contracts.filter(contract => contract.is_expired);

  const fetchAndSetContracts = async () => {
    setIsListLoading(true);
    setListError(null);
    try {
      const freshData = await fetchSymbolContracts(symbolId);
      setContracts(freshData.contracts);
    } catch (e) {
      setListError("خطا در بروزرسانی لیست قراردادها.");
    } finally {
      setIsListLoading(false);
    }
  };
  
  useEffect(() => {
    if (isOpen) {
        setListError(initialError);
        setContracts(initialContracts);
    }
  }, [isOpen, initialContracts, initialError]);

  const handleDateSelect = async (contract: Contract) => {
    const dateObject = new Date(contract.expire_date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedExpireDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    await fetchOptionChain(symbolId, formattedExpireDate);
    setIsOpen(false); // Close modal after selection
    setActiveTab('option-chain'); // Switch tab
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>
            {`قراردادهای نماد ${symbolName}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-start">
              <Button onClick={fetchAndSetContracts} variant="outline" size="sm" disabled={isListLoading}>
                  <RefreshCw className={`ml-2 h-4 w-4 ${isListLoading ? 'animate-spin' : ''}`} />
                  بروزرسانی
              </Button>
          </div>
          {isListLoading ? (
              <div className="space-y-2 p-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
              </div>
          ) : listError ? (
               <p className="text-center text-red-500 py-10">{listError}</p>
          ) : (
            <ScrollArea className="h-96 w-full rounded-md border">
              <div className="p-4">
                {contracts.length > 0 ? (
                  <>
                    <h3 className="text-lg font-semibold text-right mb-2">قراردادهای فعال</h3>
                    {activeContracts.length > 0 ? (
                      activeContracts.map((contract, index) => (
                        <div
                          key={`active-${index}`}
                          onClick={() => handleDateSelect(contract)}
                          className="flex items-center justify-between p-3 mb-2 bg-muted/50 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                        >
                          <div className="flex flex-col text-right">
                            <span className="font-semibold">
                              {new Date(contract.expire_date).toLocaleDateString("fa-IR", { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {`${contract.mature} روز تا سررسید`}
                            </span>
                          </div>
                          <Badge variant={"default"}>
                            فعال
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">قرارداد فعالی وجود ندارد.</p>
                    )}

                    {expiredContracts.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-right mb-2">قراردادهای منقضی شده</h3>
                        {expiredContracts.map((contract, index) => (
                          <div
                            key={`expired-${index}`}
                            onClick={() => handleDateSelect(contract)}
                            className="flex items-center justify-between p-3 mb-2 bg-muted/50 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                          >
                            <div className="flex flex-col text-right">
                              <span className="font-semibold">
                                {new Date(contract.expire_date).toLocaleDateString("fa-IR", { year: 'numeric', month: 'long', day: 'numeric' })}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {`${contract.mature} روز تا سررسید`}
                              </span>
                            </div>
                            <Badge variant={"destructive"}>
                              منقضی شده
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center text-muted-foreground py-10">قراردادی برای نمایش وجود ندارد.</p>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
