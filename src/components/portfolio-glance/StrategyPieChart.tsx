
"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Strategy } from '@/types/domain';

interface PieChartProps {
  data: Strategy[];
  portfolioValue: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${payload.name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const StrategyPieChart: React.FC<PieChartProps> = ({ data, portfolioValue }) => {
    const chartData = data.map(strategy => ({
        name: strategy.name,
        value: Math.abs(strategy.marketValue),
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
        <PieChart>
            <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            >
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip
            formatter={(value: number, name: string) => {
                const percentage = ((value / portfolioValue) * 100).toFixed(2);
                return [`${value.toLocaleString('fa-IR')} ریال (${percentage}%)`, name];
            }}
            />
            <Legend />
        </PieChart>
        </ResponsiveContainer>
    );
};

export default StrategyPieChart;
