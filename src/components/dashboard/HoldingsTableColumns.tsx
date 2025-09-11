"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Position } from "@/types/domain"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

const formatCurrency = (value: number | undefined | null, showSign = false) => {
    if (value === undefined || value === null) return 'N/A';
    const options = {
        style: 'currency',
        currency: 'IRR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        signDisplay: showSign ? 'always' : 'auto' as any,
    };
    return new Intl.NumberFormat('fa-IR', options).format(value);
};

const formatNumber = (value: number | undefined | null) => {
    if (value === undefined || value === null) return 'N/A';
    return new Intl.NumberFormat('fa-IR').format(value);
};

const formatPercent = (value: number | undefined | null) => {
    if (value === undefined || value === null) return 'N/A';
    return `${new Intl.NumberFormat('fa-IR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}٪`;
};

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(dateString));
}

export const getColumns = (): ColumnDef<Position>[] => [
  {
    accessorKey: "symbol",
    header: "نماد",
    cell: ({ row }) => <div className="font-medium text-right">{row.getValue("symbol")}</div>,
    size: 120,
  },
   {
    accessorKey: "broker",
    header: "کارگزار",
    cell: ({ row }) => <div className="text-center">{row.original.broker || 'N/A'}</div>,
    size: 100,
  },
  {
    accessorKey: "expiry",
    header: "سررسید",
    cell: ({ row }) => <div className="text-center">{formatDate(row.original.expiry)}</div>,
    size: 100,
  },
  {
    accessorKey: "portfolioAllocation",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        تخصیص ٪<ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{formatPercent(row.original.portfolioAllocation)}</div>,
    size: 120,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        تعداد<ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{formatNumber(row.getValue("quantity"))}</div>,
    size: 100,
  },
  {
    accessorKey: "avgCost",
    header: "بهای هر سهم",
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.original.avgCost)}</div>,
    size: 120,
  },
  {
    accessorKey: "totalCost",
    header: "بهای کل تمام شده",
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.original.avgCost * row.original.quantity)}</div>,
    size: 150,
  },
  {
    accessorKey: "marketPrice",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        آخرین قیمت<ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.getValue("marketPrice"))}</div>,
    size: 120,
  },
    {
    accessorKey: "closePrice",
    header: "قیمت پایانی",
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.original.closePrice)}</div>,
    size: 120,
  },
  {
    accessorKey: "marketValue",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        ارزش بازار<ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.getValue("marketValue"))}</div>,
    size: 150,
  },
    {
    accessorKey: "unrealizedPnl",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        سود/زیان خالص<ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const pnl = parseFloat(row.getValue("unrealizedPnl"))
      const isPositive = pnl >= 0
      return (
        <div className={`text-right font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
          {formatCurrency(pnl, true)}
        </div>
      )
    },
    size: 150,
  },
   {
    accessorKey: "unrealizedPnlPercent",
    header: "درصد سود/زیان",
    cell: ({ row }) => {
      const pnl = row.original.unrealizedPnl;
      const cost = row.original.avgCost * row.original.quantity;
      if (cost === 0) return <div className="text-center">N/A</div>;
      const pnlPercent = (pnl / Math.abs(cost)) * 100;
      const isPositive = pnl >= 0;
       return (
        <div className={`text-center font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
          {formatPercent(pnlPercent)}
        </div>
      )
    },
    size: 120,
  },
  {
      accessorKey: "greeks.delta",
      header: "دلتا",
      cell: ({ row }) => {
          const delta = row.original.greeks?.delta
          return <div className="text-center">{delta !== undefined ? delta.toFixed(2) : 'N/A'}</div>
      },
      size: 80,
  },
]
