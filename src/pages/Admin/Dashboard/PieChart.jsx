"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A pie chart displaying the count of boys and girls";

const chartConfig = {
    boys: {
        label: "Boys",
        color: "hsl(var(--chart-1))",
    },
    girls: {
        label: "Girls",
        color: "hsl(var(--chart-2))",
    },
};

const PieChartComponent = ({ chartData }) => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Student Gender Distribution</CardTitle>
                <CardDescription>Gender count as of 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px]"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
                        <Pie data={chartData} dataKey="count">
                            <LabelList
                                dataKey="category"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value) => chartConfig[value.toLowerCase()]?.label}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none"></div>
                <div className="leading-none text-muted-foreground">
                    Showing gender distribution for 2024
                </div>
            </CardFooter>
        </Card>
    );
};

export default PieChartComponent;
