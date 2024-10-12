import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ExtracurricularActivities = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);

    const columns = [
        { header: "Activity name", accessor: "Activity name" },

        { header: "Fees", accessor: "Fees" },
        { header: "Due date", accessor: "Due date", style: "hidden md:table-cell" },
    ];

    useEffect(() => {
        const getActivity = async () => {
            try {
                const res = await axios.get(BASE_URL + "/activitys/student-activity", {
                    headers: { token: token },
                });

                console.log(res?.data?.data?.extraCurricularActivity);
                setActivities(res?.data?.data?.extraCurricularActivity);
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
        getActivity();
    }, []);

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className="font-semibold">{item?.name}</p>
                    <p className="text-xs text-gray-500">{item?.description}</p>
                </div>
            </td>
            {/* <td className="text-center">{item?.class}</td> */}
            <td className=" text-center">{item?.fees ? item?.fees : " -- "}</td>
            <td className="hidden md:table-cell text-center">{item?.duedate?.split("T")[0]}</td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Activities</h1>
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
                <tbody>{activities?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default ExtracurricularActivities;
