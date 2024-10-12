import React from "react";
import PieChartComponent from "./PieChart";
import { useSelector } from "react-redux";

const Attendance = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    return (
        <div>
            {" "}
            <PieChartComponent user={user} />
            {/* <div className="mt-5">
                <Card>
                    <div className="flex items-center justify-between p-3 m-5">
                        <h1 className="text-xl font-semibold">Subject</h1>
                        <h1 className="text-xl font-semibold">Presenty</h1>
                    </div>
                  {subjects?.map((sub, ind) => (
                        <div className="flex items-center justify-between border-2 p-3 m-5">
                            <h1 className="text-xl font-semibold">Maths</h1>
                            <h1 className="text-xl font-semibold">20%</h1>
                        </div>
                    ))}  
                </Card>
            </div> */}
        </div>
    );
};

export default Attendance;
