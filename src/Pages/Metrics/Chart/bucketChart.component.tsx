"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const chartData = [
  { date: "2024-04-01", aOperations: 222, bOperations: 150 },
  { date: "2024-04-02", aOperations: 97, bOperations: 180 },
  { date: "2024-04-03", aOperations: 167, bOperations: 120 },
  { date: "2024-04-04", aOperations: 242, bOperations: 260 },
  { date: "2024-04-05", aOperations: 373, bOperations: 290 },
  { date: "2024-04-06", aOperations: 301, bOperations: 340 },
  { date: "2024-04-07", aOperations: 245, bOperations: 180 },
  { date: "2024-04-08", aOperations: 409, bOperations: 320 },
  { date: "2024-04-09", aOperations: 59, bOperations: 110 },
  { date: "2024-04-10", aOperations: 261, bOperations: 190 },
  { date: "2024-04-11", aOperations: 327, bOperations: 350 },
  { date: "2024-04-12", aOperations: 292, bOperations: 210 },
  { date: "2024-04-13", aOperations: 342, bOperations: 380 },
  { date: "2024-04-14", aOperations: 137, bOperations: 220 },
  { date: "2024-04-15", aOperations: 120, bOperations: 170 },
  { date: "2024-04-16", aOperations: 138, bOperations: 190 },
  { date: "2024-04-17", aOperations: 446, bOperations: 360 },
  { date: "2024-04-18", aOperations: 364, bOperations: 410 },
  { date: "2024-04-19", aOperations: 243, bOperations: 180 },
  { date: "2024-04-20", aOperations: 89, bOperations: 150 },
  { date: "2024-04-21", aOperations: 137, bOperations: 200 },
  { date: "2024-04-22", aOperations: 224, bOperations: 170 },
  { date: "2024-04-23", aOperations: 138, bOperations: 230 },
  { date: "2024-04-24", aOperations: 387, bOperations: 290 },
  { date: "2024-04-25", aOperations: 215, bOperations: 250 },
  { date: "2024-04-26", aOperations: 75, bOperations: 130 },
  { date: "2024-04-27", aOperations: 383, bOperations: 420 },
  { date: "2024-04-28", aOperations: 122, bOperations: 180 },
  { date: "2024-04-29", aOperations: 315, bOperations: 240 },
  { date: "2024-04-30", aOperations: 454, bOperations: 380 },
  { date: "2024-05-01", aOperations: 165, bOperations: 220 },
  { date: "2024-05-02", aOperations: 293, bOperations: 310 },
  { date: "2024-05-03", aOperations: 247, bOperations: 190 },
  { date: "2024-05-04", aOperations: 385, bOperations: 420 },
  { date: "2024-05-05", aOperations: 481, bOperations: 390 },
  { date: "2024-05-06", aOperations: 498, bOperations: 520 },
  { date: "2024-05-07", aOperations: 388, bOperations: 300 },
  { date: "2024-05-08", aOperations: 149, bOperations: 210 },
  { date: "2024-05-09", aOperations: 227, bOperations: 180 },
  { date: "2024-05-10", aOperations: 293, bOperations: 330 },
  { date: "2024-05-11", aOperations: 335, bOperations: 270 },
  { date: "2024-05-12", aOperations: 197, bOperations: 240 },
  { date: "2024-05-13", aOperations: 197, bOperations: 160 },
  { date: "2024-05-14", aOperations: 448, bOperations: 490 },
  { date: "2024-05-15", aOperations: 473, bOperations: 380 },
  { date: "2024-05-16", aOperations: 338, bOperations: 400 },
  { date: "2024-05-17", aOperations: 499, bOperations: 420 },
  { date: "2024-05-18", aOperations: 315, bOperations: 350 },
  { date: "2024-05-19", aOperations: 235, bOperations: 180 },
  { date: "2024-05-20", aOperations: 177, bOperations: 230 },
  { date: "2024-05-21", aOperations: 82, bOperations: 140 },
  { date: "2024-05-22", aOperations: 81, bOperations: 120 },
  { date: "2024-05-23", aOperations: 252, bOperations: 290 },
  { date: "2024-05-24", aOperations: 294, bOperations: 220 },
  { date: "2024-05-25", aOperations: 201, bOperations: 250 },
  { date: "2024-05-26", aOperations: 213, bOperations: 170 },
  { date: "2024-05-27", aOperations: 420, bOperations: 460 },
  { date: "2024-05-28", aOperations: 233, bOperations: 190 },
  { date: "2024-05-29", aOperations: 78, bOperations: 130 },
  { date: "2024-05-30", aOperations: 340, bOperations: 280 },
  { date: "2024-05-31", aOperations: 178, bOperations: 230 },
  { date: "2024-06-01", aOperations: 178, bOperations: 200 },
  { date: "2024-06-02", aOperations: 470, bOperations: 410 },
  { date: "2024-06-03", aOperations: 103, bOperations: 160 },
  { date: "2024-06-04", aOperations: 439, bOperations: 380 },
  { date: "2024-06-05", aOperations: 88, bOperations: 140 },
  { date: "2024-06-06", aOperations: 294, bOperations: 250 },
  { date: "2024-06-07", aOperations: 323, bOperations: 370 },
  { date: "2024-06-08", aOperations: 385, bOperations: 320 },
  { date: "2024-06-09", aOperations: 438, bOperations: 480 },
  { date: "2024-06-10", aOperations: 155, bOperations: 200 },
  { date: "2024-06-11", aOperations: 92, bOperations: 150 },
  { date: "2024-06-12", aOperations: 492, bOperations: 420 },
  { date: "2024-06-13", aOperations: 81, bOperations: 130 },
  { date: "2024-06-14", aOperations: 426, bOperations: 380 },
  { date: "2024-06-15", aOperations: 307, bOperations: 350 },
  { date: "2024-06-16", aOperations: 371, bOperations: 310 },
  { date: "2024-06-17", aOperations: 475, bOperations: 520 },
  { date: "2024-06-18", aOperations: 107, bOperations: 170 },
  { date: "2024-06-19", aOperations: 341, bOperations: 290 },
  { date: "2024-06-20", aOperations: 408, bOperations: 450 },
  { date: "2024-06-21", aOperations: 169, bOperations: 210 },
  { date: "2024-06-22", aOperations: 317, bOperations: 270 },
  { date: "2024-06-23", aOperations: 480, bOperations: 530 },
  { date: "2024-06-24", aOperations: 132, bOperations: 180 },
  { date: "2024-06-25", aOperations: 141, bOperations: 190 },
  { date: "2024-06-26", aOperations: 434, bOperations: 380 },
  { date: "2024-06-27", aOperations: 448, bOperations: 490 },
  { date: "2024-06-28", aOperations: 149, bOperations: 200 },
  { date: "2024-06-29", aOperations: 103, bOperations: 160 },
  { date: "2024-06-30", aOperations: 446, bOperations: 400 },
];

const chartConfig = {
  visitors: {
    label: "Amount",
  },
  aOperations: {
    label: "A operations",
    color: "hsl(var(--chart-1))",
  },
  bOperations: {
    label: "B operations",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BucketChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="aOperations"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="bOperations"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
