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
    present: {
        label: "Present",
        color: "#399918",
    },
    absent: {
        label: "Absent",
        color: "#FF0000",
    },
};

const PieChartComponent = ({ user }) => {
    console.log(user);
    const chartData = [
        { category: "Present", count: user?.presentDays?.length, fill: "#399918" },
        { category: "Absent", count: user?.absentDays?.length, fill: "#FF0000" },
    ];
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Student Attendance</CardTitle>
                <CardDescription>Your attendance is low</CardDescription>
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
            {/* <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Present count is higher by 5.2% <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing your attendance 2024
                </div>
            </CardFooter> */}
        </Card>
    );
};

export default PieChartComponent;
