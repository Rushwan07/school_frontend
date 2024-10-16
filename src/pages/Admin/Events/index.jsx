import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateEvents from "./CreateEvents";
import EditEvent from "./EditEvents";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Events = () => {
    const [events, setEvents] = useState([]);
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    useEffect(() => {
        const getAssignments = async () => {
            try {
                const res = await axios.get(BASE_URL + "/events/admin-event", {
                    headers: { token: token },
                });
                setEvents(res?.data?.data?.events);
            } catch (error) {
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
            }
        };
        getAssignments();
    }, []);

    const handleRemove = async (id) => {
        try {
            if (id) {
                // Make delete request to the server
                const res = await axios.delete(`${BASE_URL}/events/${id}`);

                // Show success message

                // Update the state to remove the deleted cruise from the UI
                setEvents((prevAnnouncement) =>
                    prevAnnouncement.filter((announce) => announce._id !== id),
                );
            }
        } catch (error) {
            // Show error message
            console.error(error);
        }
    };

    const columns = [
        { header: "Event name", accessor: "Event name" },
        { header: "class", accessor: "class" },
        { header: "startDate", accessor: "startDate" },
        { header: "Due Date", accessor: "Due Date", style: "hidden md:table-cell" },
        { header: "Start time", accessor: "Start time", style: "hidden md:table-cell" },
        { header: "End time", accessor: "End time", style: "hidden md:table-cell" },
        { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
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
            {console.log(item)}
            <td className="text-center">{item?.classId?.name || "All class"}</td>
            <td className=" text-center">{item?.dates[0]?.split("T")[0]}</td>
            <td className="hidden md:table-cell text-center">
                {item?.dates[item?.dates.length - 1]?.split("T")[0]}
            </td>
            <td className="hidden md:table-cell text-center">{item?.startTime || "Full day"}</td>
            <td className="hidden md:table-cell text-center">{item?.endTime || "Full day"}</td>

            <td className="flex hidden md:table-cell items-center justify-center  text-center">
                <EditEvent item={item} setEvents={setEvents} /> &nbsp;
                <Button variant="destructive" size="icon">
                    <Trash2Icon
                        size={"20"}
                        onClick={() => {
                            handleRemove(item._id);
                        }}
                    />
                </Button>
            </td>
        </tr>
    );
    console.log(events);
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Events</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search events"
                        className="border rounded px-3 py-2"
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                        <CreateEvents setEvents={setEvents} />
                    </div>
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
                <tbody>{events?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Events;
