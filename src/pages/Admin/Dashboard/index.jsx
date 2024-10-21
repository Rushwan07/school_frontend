import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import PieChartComponent from "./PieChart";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
    const [chartData, setChartData] = useState([]);
    const [piChartData, setPiChartData] = useState([]);
    const [studentsCount, setStudentsCount] = useState(0);
    const [teachersCount, setTeachersCount] = useState(0);
    const [transportCount, setTransportCount] = useState(0);
    useEffect(() => {
        const getChartData = async () => {
            try {
                const res = await axios.get(BASE_URL + "/attendances/admin-chart");
                console.log(res?.data?.data?.chartData);
                const pichartRes = await axios.get(BASE_URL + "/students/admin-gender-count");
                setPiChartData(pichartRes?.data?.data?.chartData);
                const studentCountres = await axios.get(BASE_URL + "/students/admin-student-count");
                setStudentsCount(studentCountres?.data?.data?.count);
                const teacherCountres = await axios.get(BASE_URL + "/teachers/admin-teacher-count");
                setTeachersCount(teacherCountres?.data?.data?.teacherCount);

                const transportCountres = await axios.get(
                    BASE_URL + "/transports/admin-transport-count",
                );

                setTransportCount(transportCountres?.data?.data?.transportCount);

                setChartData(res?.data?.data?.chartData);
            } catch (error) {
                console.log(error);
            }
        };
        getChartData();
    }, []);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-5">
                <BarChart chartData={chartData} />
                <PieChartComponent chartData={piChartData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                        <p className="text-4xl font-bold text-chart-3 ">{studentsCount}</p>
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
                        <p className="text-4xl font-bold text-chart-3">{teachersCount}</p>
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
                        <p className="text-4xl font-bold text-chart-3">{transportCount}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
