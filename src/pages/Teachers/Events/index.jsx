import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Events = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [date, setDate] = useState(null);

    const [filteredEvents, setFilteredEvents] = useState(events);

    useEffect(() => {
        const filtered = events.filter((item) => {
            const matchesSearchTerm =
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.description &&
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.classId?.name &&
                    item.classId.name.toLowerCase().includes(searchTerm.toLowerCase()));

            // Check if a date is selected and if the event's date matches the selected date
            const matchesDate =
                !date || // If no date is selected, match all events
                item.dates.some(
                    (eventDate) =>
                        new Date(eventDate).toDateString() === new Date(date).toDateString(),
                );

            return matchesSearchTerm && matchesDate; // Both search and date must match
        });

        setFilteredEvents(filtered);
    }, [searchTerm, date, events]);

    useEffect(() => {
        const get = async () => {
            try {
                const res = await axios.get(BASE_URL + "/events/teacher-event", {
                    headers: { token: token },
                });
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
        get();
    }, []);

    const columns = [
        { header: "Event name", accessor: "Event name" },
        { header: "class", accessor: "class" },
        { header: "startDate", accessor: "startDate" },
        // { header: "Due Date", accessor: "Due Date", style: "hidden md:table-cell" },
        { header: "Start time", accessor: "Start time", style: "hidden md:table-cell" },
        { header: "End time", accessor: "End time", style: "hidden md:table-cell" },
    ];
    const renderRow = (item) => (
        <tr
            key={item._id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className="font-semibold">{item?.name}</p>
                    <p className="text-xs text-gray-500">{item?.description}</p>
                </div>
            </td>
            <td className="text-center">{item?.classId?.name || "All class"}</td>
            <td className=" text-center">{item?.dates[0]?.split("T")[0]}</td>
            {/* <td className="hidden md:table-cell text-center">{item?.duedate}</td> */}
            <td className="hidden md:table-cell text-center">{item?.startTime || "Full day"}</td>
            <td className="hidden md:table-cell text-center">{item?.endTime || "Full day"}</td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Events</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search events"
                        className="border rounded px-3 py-2"
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    />
                    {/* <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                    </div> */}
                </div>
            </div>

            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-center  text-xs font-semibold">
                        {columns?.map((column) => (
                            <th
                                key={column.header}
                                className={`px-6 py-3 max-w-[200px] ${column.style} `}
                            >
                                {column?.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{filteredEvents?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Events;
