"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/UI/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/Components/UI/chart";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

export interface MetricChartInterface {
  time: string | number;
  value: number;
}

type AssessmentMetricChartProps = {
  label: string;
  subLabel: string;
  chartData: MetricChartInterface[];
  metricName: string;
  metricMetadata: MetricMetadata;
};

export function AssessmentMetricChart({
  label,
  subLabel,
  chartData,
  metricName,
  metricMetadata,
}: AssessmentMetricChartProps) {
  const chartConfig: ChartConfig = {
    value: {
      label: metricName,
      color: "#010101",
    },
  };

  const formatOnIsBillion = (value: number) =>
    metricMetadata.is_should_divine_by_billion ? value / 1000000000 : value;

  const formatOnAll = (value: number) => {
    value = formatOnIsBillion(value);
    value = Math.round(value * 100) / 100;

    if (metricMetadata.is_percentage) {
      return `${value}%`;
    }
    const formattedValue = value;
    return metricMetadata.unit
      ? `${formattedValue} ${metricMetadata.unit}`
      : formattedValue;
  };

  const formatWithPercentage = (value: number) => {
    value = formatOnIsBillion(value);
    value = Math.round(value * 100) / 100;

    if (metricMetadata.is_percentage) {
      return `${value}%`;
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background shadow-md p-2 border border-border rounded">
          <p className="font-medium text-slate-600 text-xs">{`Năm: ${label}`}</p>
          <p className="font-medium text-slate-600 text-xs">
            {`${metricName}: ${formatOnAll(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-none border-none w-full">
      <CardHeader>
        <CardTitle className="text-slate-700">{label}</CardTitle>
        <CardDescription>
          {subLabel} {metricMetadata.unit && `- Đơn vị: ${metricMetadata.unit}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  typeof value === "string" ? value.slice(0, 4) : value
                }
              />
              {/* <YAxis
                tickLine={false}
                axisLine={false}
                // tickMargin={8}
                // tickFormatter={formatOnAll}
              /> */}
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Line
                dataKey="value"
                type="stepAfter"
                stroke="#727272"
                strokeWidth={2}
                animationDuration={300}
                dot={{
                  fill: "#727272",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  offset={12}
                  className="fill-slate-600"
                  fontSize={10}
                  fontWeight={600}
                  formatter={formatWithPercentage}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
