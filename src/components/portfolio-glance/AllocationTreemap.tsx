
"use client"

import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import type { Position } from '@/types/domain';

interface TreemapProps {
  data: Position[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const allocation = (data.marketValue / data.totalValue * 100).toFixed(2);
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-lg">
        <p className="font-bold">{data.name}</p>
        <p>ارزش بازار: {data.value.toLocaleString('fa-IR')} ریال</p>
        <p>تخصیص: {allocation}%</p>
      </div>
    );
  }

  return null;
};

const AllocationTreemap: React.FC<TreemapProps> = ({ data }) => {
  const totalValue = data.reduce((sum, pos) => sum + Math.abs(pos.marketValue), 0);
  const treemapData = data.map((pos, index) => ({
    name: pos.symbol,
    value: Math.abs(pos.marketValue),
    marketValue: pos.marketValue,
    totalValue: totalValue,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        data={treemapData}
        dataKey="value"
        ratio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
        isAnimationActive={true}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default AllocationTreemap;
