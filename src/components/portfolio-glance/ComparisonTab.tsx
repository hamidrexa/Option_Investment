
"use client"

import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';

// Mock data for historical comparison
const comparisonData = [
  { month: 'فروردین ۱۴۰۳', portfolioReturn: 2.5, indexReturn: 1.8 },
  { month: 'اردیبهشت ۱۴۰۳', portfolioReturn: -1.2, indexReturn: -0.5 },
  { month: 'خرداد ۱۴۰۳', portfolioReturn: 3.8, indexReturn: 2.5 },
  { month: 'تیر ۱۴۰۳', portfolioReturn: 1.5, indexReturn: 2.0 },
  { month: 'مرداد ۱۴۰۳', portfolioReturn: 4.1, indexReturn: 3.2 },
  { month: 'شهریور ۱۴۰۳', portfolioReturn: 0.8, indexReturn: 1.1 },
];

const formatPercent = (value: number) => `${value.toFixed(2)}%`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="font-bold mb-2">{label}</p>
        <p style={{ color: payload[0].color }}>
          {`بازدهی پرتفو: ${formatPercent(payload[0].value)}`}
        </p>
        <p style={{ color: payload[1].color }}>
          {`بازدهی شاخص کل: ${formatPercent(payload[1].value)}`}
        </p>
      </div>
    );
  }
  return null;
};

// Mock data for the details table
const detailsData = [
  { date: '۱۴۰۳/۰۶/۳۱', assetValue: '۱۲,۵۸۳,۴۰۰,۰۰۰', netBuy: '۲۰۰,۰۰۰,۰۰۰', netSell: '۵۰,۰۰۰,۰۰۰', netChange: '۱۵۰,۰۰۰,۰۰۰', netChangePercent: '۱.۲٪', cashIn: '۰', cashOut: '۱۰,۰۰۰,۰۰۰' },
  { date: '۱۴۰۳/۰۵/۳۱', assetValue: '۱۲,۴۳۳,۴۰۰,۰۰۰', netBuy: '۴۵۰,۰۰۰,۰۰۰', netSell: '۱۲۰,۰۰۰,۰۰۰', netChange: '۳۳۰,۰۰۰,۰۰۰', netChangePercent: '۲.۷٪', cashIn: '۵۰,۰۰۰,۰۰۰', cashOut: '۰' },
];

export default function ComparisonTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>مقایسه تاریخی بازدهی پرتفو و شاخص کل</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparisonData}>
              <XAxis dataKey="month" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--accent))' }} />
              <Legend wrapperStyle={{ direction: 'rtl', padding: '10px 0' }} />
              <Bar dataKey="portfolioReturn" name="بازدهی پرتفو" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="indexReturn" name="بازدهی شاخص کل" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>جدول جزئیات بازدهی</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>تاریخ</TableHead>
                        <TableHead>ارزش دارایی</TableHead>
                        <TableHead>خالص تغییر ارزش</TableHead>
                        <TableHead>درصد تغییر</TableHead>
                        <TableHead>پول ورودی/خروجی</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {detailsData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.assetValue}</TableCell>
                            <TableCell>{row.netChange}</TableCell>
                            <TableCell>{row.netChangePercent}</TableCell>
                            <TableCell>{row.cashIn} / {row.cashOut}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
