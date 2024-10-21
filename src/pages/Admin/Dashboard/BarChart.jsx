"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A bar chart displaying student attendance";

const chartConfig = {
    attendance: {
        label: "Attendance",
        color: "hsl(var(--chart-3))",
    },
};

const Chart = ({ chartData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Attendance</CardTitle>
                <CardDescription>January - December 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="attendance" fill="var(--color-attendance)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* <div className="flex gap-2 font-medium leading-none">
                    Attendance improved by 4% this month <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="leading-none text-muted-foreground">
                    Showing student attendance for the current year
                </div>
            </CardFooter>
        </Card>
    );
};

export default Chart;
