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
import localizationService from "@/Localization/localization.service";
import bucketServiceInstance from "@/Services/Buckets/buckets.api.service";
import type { MetricResponse } from "@/Services/Buckets/buckets.types";
import { useCallback, useEffect, useState } from "react";

const chartConfig = {
  visitors: {
    label: `${localizationService.translate("amount")}`,
  },
  typeAOperationsCount: {
    label: `A ${localizationService.translate("operations")}`,
    color: "hsl(var(--chart-1))",
  },
  typeBOperationsCount: {
    label: `B ${localizationService.translate("operations")}`,
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BucketChart(props: { bucketId: string }) {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [metrics, setMetrics] = useState<MetricResponse[]>([]);

  const fetchBuckets = useCallback(async () => {
    const filterData = (data: MetricResponse[]) =>
      data.filter((item) => {
        const date = new Date(item.date);

        const latestDate = data.reduce((max, current) => {
          const currentDate = new Date(current.date);
          return currentDate > max ? currentDate : max;
        }, new Date(0));

        let daysToSubtract = 90;

        if (timeRange === "30d") {
          daysToSubtract = 30;
        } else if (timeRange === "7d") {
          daysToSubtract = 7;
        }

        const startDate = new Date(latestDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
      });

    const response = await bucketServiceInstance.GetMetrics(props.bucketId);
    console.log("response", response);
    setMetrics(filterData(response));
  }, [props.bucketId, timeRange]);

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>
            {" "}
            {localizationService.translate("bucket_interactive")}
          </CardTitle>
          <CardDescription>
            {localizationService.translate("showing_total_operations_metrics")}
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
              {localizationService.translate("last_3_months")}
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              {localizationService.translate("last_30_days")}
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              {localizationService.translate("last_7_days")}
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={metrics}>
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
              dataKey="typeAOperationsCount"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="typeBOperationsCount"
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
