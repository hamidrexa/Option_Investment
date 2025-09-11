"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Position } from "@/types/domain"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const formatNumber = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('fa-IR').format(value);
};

export const getColumns = (): ColumnDef<Position>[] => [
  {
    accessorKey: "symbol",
    header: "نماد",
    cell: ({ row }) => <div className="font-medium">{row.getValue("symbol")}</div>,
  },
  {
    accessorKey: "instrumentType",
    header: "نوع ابزار",
    cell: ({ row }) => <div className="capitalize">{row.getValue("instrumentType")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          تعداد
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{formatNumber(row.getValue("quantity"))}</div>,
  },
  {
    accessorKey: "marketPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          آخرین قیمت
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-left">{formatCurrency(row.getValue("marketPrice"))}</div>,
  },
  {
    accessorKey: "marketValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ارزش بازار
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-left">{formatCurrency(row.getValue("marketValue"))}</div>,
  },
    {
    accessorKey: "unrealizedPnl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          سود/زیان خالص
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const pnl = parseFloat(row.getValue("unrealizedPnl"))
      const isPositive = pnl >= 0
      return (
        <div className={`text-left font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {formatCurrency(pnl)}
        </div>
      )
    },
  },
  {
      accessorKey: "greeks.delta",
      header: "دلتا",
      cell: ({ row }) => {
          const delta = row.original.greeks?.delta
          return <div className="text-center">{delta !== undefined ? delta.toFixed(2) : 'N/A'}</div>
      },
  },
  {
      accessorKey: "portfolioAllocation",
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          تخصیص ٪
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      )
    },
      cell: ({ row }) => {
          const allocation = row.original.portfolioAllocation
          const formattedAllocation = allocation !== undefined ? new Intl.NumberFormat('fa-IR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(allocation) : 'N/A';
          return <div className="text-center">{allocation !== undefined ? `${formattedAllocation}%` : 'N/A'}</div>
      },
  },
]
