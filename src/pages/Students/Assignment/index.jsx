import React, { useEffect, useState } from "react";
import BigCalendar from "./BigCalendar";
import EventCalendar from "./EventCalendar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Assignments = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const { toast } = useToast();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);

    // const assignments = [
    //     {
    //         _id: "670509f30283e5ca5122723c",
    //         title: "Write about someone",
    //         startDate: "2024-10-03T18:30:00.000Z",
    //         dueDate: "2024-10-18T00:00:00.000Z",
    //         description: "Description about the assignment",
    //         classId: "6704ec91fee39a5e6ebd0162",
    //         subjectId: "6704ea5418b730aed6cc5089",
    //     },
    // ];

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const getAssignments = async () => {
            try {
                const res = await axios.get(BASE_URL + "/assignments/student-assignment", {
                    headers: { token: token },
                });

                console.log(res?.data?.data?.assignment);
                setAssignments(res?.data?.data?.assignment);
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
        getAssignments();
    }, []);

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row assignment-page">
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule (4A)</h1>
                    {/* Pass assignments and selectedDate to BigCalendar */}
                    <BigCalendar assignments={assignments} selectedDate={selectedDate} />
                </div>
            </div>

            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                {/* Pass assignments and date click handler to EventCalendar */}
                <EventCalendar assignments={assignments} onDateClick={handleDateClick} />
            </div>
        </div>
    );
};

export default Assignments;
