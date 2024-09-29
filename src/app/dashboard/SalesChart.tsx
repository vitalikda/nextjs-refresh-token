"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { IconSpinner } from "src/components/icons/spinner";
import { useGetSalesStats } from "src/hooks/useGetSalesStats";

export function SalesChart() {
  const { data, isPending: isLoading } = useGetSalesStats();

  return (
    <ResponsiveContainer width="100%" height={300}>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <IconSpinner className="mr-2 h-8 w-8 animate-spin" />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}
