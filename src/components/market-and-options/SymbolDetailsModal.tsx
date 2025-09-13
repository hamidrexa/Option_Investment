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
import { Contract, DetailedContract, fetchContractDetails, fetchSymbolContracts } from "@/services/symbolService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRightIcon, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [view, setView] = useState<'list' | 'details'>('list');
  
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [details, setDetails] = useState<DetailedContract[] | null>(null);

  const [isListLoading, setIsListLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  
  const [listError, setListError] = useState<string | null>(initialError);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [selectedContractDate, setSelectedContractDate] = useState('');

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
        // Reset state when opening the modal
        setView('list');
        setDetails(null);
        setDetailsError(null);
        setListError(initialError);
        setContracts(initialContracts);
        
        // Optionally, uncomment to always fetch fresh data on open
        // fetchAndSetContracts();
    }
  }, [isOpen, initialContracts, initialError, symbolId]);

  const fetchDetailsForDate = async (contract: Contract) => {
    setIsDetailsLoading(true);
    setDetailsError(null);
    setSelectedContract(contract);
    setSelectedContractDate(new Date(contract.expire_date).toLocaleDateString("fa-IR"));
    
    const dateObject = new Date(contract.expire_date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // getMonth() is 0-indexed
    const day = dateObject.getDate();
    const formattedExpireDate = `${year}-${month}-${day}`;

    try {
      const result = await fetchContractDetails(symbolId, formattedExpireDate);
      const selectedDate = new Date(contract.expire_date);

      const filteredContracts = result.contracts.filter(c => {
        const contractDate = new Date(c.expire_date);
        return contractDate.getFullYear() === selectedDate.getFullYear() &&
               contractDate.getMonth() === selectedDate.getMonth() &&
               contractDate.getDate() === selectedDate.getDate();
      });

      setDetails(filteredContracts);
      setView('details');
    } catch (e) {
      setDetailsError("خطا در دریافت جزئیات قرارداد. لطفاً دوباره تلاش کنید.");
      setDetails(null);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleDateSelect = (contract: Contract) => {
    fetchDetailsForDate(contract);
  };

  const handleRefreshDetails = () => {
    if (selectedContract) {
      fetchDetailsForDate(selectedContract);
    }
  };

  const handleBackToList = () => {
    setView('list');
    setDetails(null);
    setDetailsError(null);
  };
  
  const renderDetailValue = (value: any) => {
    if (typeof value === 'boolean') {
        return value ? <Badge variant="default">بله</Badge> : <Badge variant="destructive">خیر</Badge>;
    }
    if (typeof value === 'number') {
        return value.toLocaleString('fa-IR');
    }
    return String(value);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>
            {view === 'list'
              ? `قراردادهای نماد ${symbolName}`
              : `جزئیات قرارداد ${symbolName} - ${selectedContractDate}`}
          </DialogTitle>
        </DialogHeader>

        {view === 'list' && (
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
        )}
        
        {view === 'details' && (
           <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <Button onClick={handleBackToList} variant="outline">
                  بازگشت به لیست <ArrowRightIcon className="mr-2 h-4 w-4" />
              </Button>
              <Button onClick={handleRefreshDetails} variant="outline" size="sm" disabled={isDetailsLoading}>
                    <RefreshCw className={`ml-2 h-4 w-4 ${isDetailsLoading ? 'animate-spin' : ''}`} />
                    بروزرسانی
                </Button>
            </div>
            {isDetailsLoading ? (
                <div className="p-4"><Skeleton className="h-80 w-full" /></div>
            ): detailsError ? (
                <p className="text-center text-red-500 py-10">{detailsError}</p>
            ) : details && details.length > 0 && details[0].options.length > 0 ? (
              <ScrollArea className="h-[60vh] border rounded-md">
                <Table dir="rtl">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">نماد</TableHead>
                      <TableHead className="text-right">نوع</TableHead>
                      <TableHead className="text-right">قیمت اعمال</TableHead>
                      <TableHead className="text-right">آخرین قیمت</TableHead>
                      <TableHead className="text-right">اهرم</TableHead>
                      <TableHead className="text-right">فاصله تا سررسید</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details[0].options.map((option, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-right">{option.l18}</TableCell>
                        <TableCell className="text-right">{option.status === 'put' ? 'فروش' : 'خرید'}</TableCell>
                        <TableCell className="text-right">{option.strike.toLocaleString('fa-IR')}</TableCell>
                        <TableCell className="text-right">{option.pl.toLocaleString('fa-IR')}</TableCell>
                        <TableCell className="text-right">{option.lever.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{details[0].mature} روز</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : (
              <p className="text-center text-muted-foreground py-10">جزئیاتی برای این قرارداد یافت نشد.</p>
            )}
           </div>
        )}

        <DialogFooter className="sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
