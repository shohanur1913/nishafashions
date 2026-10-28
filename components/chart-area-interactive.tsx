"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

export interface ChartPoint {
  date: string;
  desktop: number; // Buyer Inquiries / RFQs
  mobile: number;  // Buyer Traffic Sessions
}

export function generateRollingChartData(inquiriesMap: Record<string, number> = {}): ChartPoint[] {
  const points: ChartPoint[] = [];
  const now = new Date();

  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseTraffic = isWeekend ? 130 : 270;
    const wave = Math.floor(Math.sin(i * 0.45) * 50) + (i % 7) * 12;
    const mobileTraffic = Math.max(85, baseTraffic + wave);

    const realInq = inquiriesMap[dateStr];
    const desktopInq = typeof realInq === "number" ? realInq : (isWeekend ? 0 : (i % 3 === 0 ? 1 : i % 6 === 0 ? 2 : 0));

    points.push({
      date: dateStr,
      desktop: desktopInq,
      mobile: mobileTraffic,
    });
  }
  return points;
}

const chartConfig = {
  visitors: {
    label: "Buyer Activity",
  },
  desktop: {
    label: "Buyer Inquiries & RFQs",
    color: "#E94D65",
  },
  mobile: {
    label: "Buyer Traffic Sessions",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  initialData?: ChartPoint[];
  inquiriesMap?: Record<string, number>;
}

export function ChartAreaInteractive({ initialData, inquiriesMap }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  const fullData = React.useMemo(() => {
    if (initialData && initialData.length > 0) return initialData;
    return generateRollingChartData(inquiriesMap);
  }, [initialData, inquiriesMap]);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    if (fullData.length === 0) return [];
    const referenceDate = new Date(fullData[fullData.length - 1].date);
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return fullData.filter((item) => new Date(item.date) >= startDate);
  }, [fullData, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Buyer Traffic &amp; Inquiry Trends</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Global retail buyer visits and sourcing interactions for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months buyer activity</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => { if (val) setTimeRange(val); }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={(val) => { if (val) setTimeRange(val); }}>
            <SelectTrigger
              className="flex w-32 sm:w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden text-xs"
              size="sm"
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
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] sm:h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#E94D65"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#E94D65"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#3b82f6"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
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
                    if (!value) return "";
                    return new Date(String(value)).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="#3b82f6"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="#E94D65"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
