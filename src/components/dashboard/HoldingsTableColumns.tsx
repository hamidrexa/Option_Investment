"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Position } from "@/types/domain"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export const getColumns = (): ColumnDef<Position>[] => [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <div className="font-medium">{row.getValue("symbol")}</div>,
  },
  {
    accessorKey: "instrumentType",
    header: "Instrument Type",
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
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-right">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "marketPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.getValue("marketPrice"))}</div>,
  },
  {
    accessorKey: "marketValue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Market Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.getValue("marketValue"))}</div>,
  },
    {
    accessorKey: "unrealizedPnl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Net P&L
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const pnl = parseFloat(row.getValue("unrealizedPnl"))
      const isPositive = pnl >= 0
      return (
        <div className={`text-right font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {formatCurrency(pnl)}
        </div>
      )
    },
  },
  {
      accessorKey: "greeks.delta",
      header: "Delta",
      cell: ({ row }) => {
          const delta = row.original.greeks?.delta
          return <div className="text-right">{delta !== undefined ? delta.toFixed(2) : 'N/A'}</div>
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
          Allocation %
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
      cell: ({ row }) => {
          const allocation = row.original.portfolioAllocation
          return <div className="text-right">{allocation !== undefined ? `${allocation.toFixed(2)}%` : 'N/A'}</div>
      },
  },
]
