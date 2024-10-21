import React, { useEffect, useState } from "react";
import PieChartComponent from "./PieChart";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Attendance = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    const [attendance, setAttendance] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAttendance = async () => {
            try {
                setLoading(true);
                const res = await axios.get(BASE_URL + "/attendances/student-attendance", {
                    headers: { token: token },
                });

                console.log(res?.data?.data?.attendance);
                setAttendance(res?.data?.data?.attendance);
            } catch (error) {
                console.log(error);
                if (error?.response?.data?.message)
                    toast({
                        variant: "destructive",
                        title: error?.response?.data?.message,
                    });
                else {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        getAttendance();
    }, []);

    return (
        <div>
            {" "}
            <PieChartComponent user={attendance} />
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
