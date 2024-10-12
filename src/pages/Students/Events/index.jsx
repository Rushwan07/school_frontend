import React, { useEffect, useState } from "react";
import BigCalendar from "./BigCalendar";
import EventCalendar from "./EventCalendar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Events = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const { toast } = useToast();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get(BASE_URL + "/events/student-event", {
                    headers: { token: token },
                });

                console.log(res?.data?.data?.events);
                setEvents(res?.data?.data?.events);
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
        getEvents();
    }, []);

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule ({user?.classId?.name})</h1>
                    {/* Pass assignments and selectedDate to BigCalendar */}
                    <BigCalendar events={events} selectedDate={selectedDate} />
                </div>
            </div>

            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                {/* Pass assignments and date click handler to EventCalendar */}
                <EventCalendar events={events} onDateClick={handleDateClick} />
            </div>
        </div>
    );
};

export default Events;
