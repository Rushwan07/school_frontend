import { Input } from "@/components/ui/input";
import { ArrowDownAZ, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
const Transportations = () => {
    const [loading, setLoading] = useState(false);
    const [transports, setTransports] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [filteredTransports, setFilteredTransports] = useState(transports); // State for filtered transports

    // Filtering logic based on search term
    useEffect(() => {
        const filtered = transports.filter(
            (item) =>
                item?.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by driver name
                item?.busNumber?.toString()?.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by bus number
                item?.stops[0]?.place?.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by first stop
                item?.stops[item?.stops?.length - 1]?.place
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()), // Filter by last stop
        );
        setFilteredTransports(filtered);
    }, [searchTerm, transports]);

    useEffect(() => {
        const getTransports = async () => {
            try {
                const res = await axios.get(BASE_URL + "/transports", {
                    withCredentials: true,
                });
                console.log(res?.data?.data);
                setTransports(res?.data?.data?.transport);
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
        getTransports();
    }, []);

    const columns = [
        { header: "  Driver name", accessor: " Driver name" },
        { header: "Bus No", accessor: "Bus No" },
        { header: "Starting place", accessor: "Starting place" },
        { header: "Ending place", accessor: "Ending place", style: "hidden md:table-cell" },
    ];
    const renderRow = (item) => (
        <tr
            key={item._id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className=" text-center gap-4 py-4 px-6">{item?.driverName}</td>
            <td className="text-center">{item?.busNumber}</td>
            <td className=" text-center">{item?.stops[0]?.place}</td>
            <td className="hidden md:table-cell text-center">
                {item?.stops[item?.stops?.length - 1]?.place}
            </td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Transportations</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search events"
                        className="border rounded px-3 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                <tbody>{filteredTransports?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Transportations;
