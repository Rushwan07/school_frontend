import React from "react";
import BarChart from "./BarChart";
import PieChartComponent from "./PieChart";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
                <BarChart />
                <PieChartComponent />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
                <Card className="shadow-lg border">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold tracking-wide text-gray-800">
                            Total Students
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Current student enrollment
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <p className="text-4xl font-bold text-chart-3 ">255</p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold tracking-wide text-gray-800">
                            Total Staff
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Active staff members
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <p className="text-4xl font-bold text-chart-3">45</p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold tracking-wide text-gray-800">
                            Transportation Vehicles
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Vehicles in service
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <p className="text-4xl font-bold text-chart-3">12</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
