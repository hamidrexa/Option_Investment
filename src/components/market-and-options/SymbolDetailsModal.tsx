
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
import { Contract } from "@/services/symbolService";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SymbolDetailsModalProps {
  symbolName: string;
  contracts: Contract[];
  children: React.ReactNode;
}

export function SymbolDetailsModal({
  symbolName,
  contracts,
  children,
}: SymbolDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>جزئیات قراردادهای {symbolName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72 w-full rounded-md border p-4">
          <div className="grid gap-4 py-4">
            {contracts.length > 0 ? (
              contracts.map((contract, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">تاریخ انقضا:</span>
                    <span>
                      {new Date(contract.expire_date).toLocaleDateString(
                        "fa-IR"
                      )}
                    </span>
                  </div>
                  <Badge
                    variant={contract.is_expired ? "destructive" : "default"}
                  >
                    {contract.is_expired ? "منقضی شده" : "فعال"}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                 قراردادی برای نمایش وجود ندارد.
              </p>
            )}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="button" onClick={() => (document.querySelector('[data-state="open"]') as HTMLElement)?.click()}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
