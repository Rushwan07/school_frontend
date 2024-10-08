import React from "react";
import PieChartComponent from "./PieChart";
import { Card } from "@/components/ui/card";
const Attendance = () => {
    const subjects = [
        { name: "Maths", presenty: 20 },
        { name: "Science", presenty: 80 },
        { name: "Chemistry", presenty: 90 },
        { name: "History", presenty: 80 },
    ];
    return (
        <div>
            {" "}
            <PieChartComponent />
            <div className="mt-5">
                <Card>
                    <div className="flex items-center justify-between p-3 m-5">
                        <h1 className="text-xl font-semibold">Subject</h1>
                        <h1 className="text-xl font-semibold">Presenty</h1>
                    </div>
                    {subjects?.map((sub, ind) => (
                        <div key={ind} className="flex items-center justify-between border-2 p-3 m-5">
                            <h1 className="text-xl font-semibold">{sub.name}</h1>
                            <h1 className="text-xl font-semibold">{sub.presenty}%</h1>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
};

export default Attendance;
