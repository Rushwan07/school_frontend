import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Pencil, Plus, SlidersHorizontal, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import StudentList from "./StudentList";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Attendance = () => {
    const [classLists, setSlassLists] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        { header: "Class", accessor: "Class" },
        { header: "Capacity", accessor: "Capacity" },
        { header: "	Supervisor", accessor: "	Supervisor" },

        { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
    ];

    const [searchTerm, setSearchTerm] = useState(""); // State to track the search input
    const [filteredClassLists, setFilteredClassLists] = useState(classLists); // State to store filtered class lists
    useEffect(() => {
        const filtered = classLists.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.teacherId?.name &&
                    item.teacherId.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.capacity && item.capacity.toString().includes(searchTerm)),
        );
        setFilteredClassLists(filtered);
    }, [searchTerm, classLists]);

    useEffect(() => {
        const getClass = async () => {
            try {
                const res = await axios.get(BASE_URL + "/classes/class-attendance", {
                    withCredentials: true,
                });
                console.log(res?.data?.data?.classes);
                setSlassLists(res?.data?.data?.classes);
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
        getClass();
    }, []);

    const renderRow = (item) => (
        <tr
            key={item._id}
            className={`border-b  border-gray-200   rounded  text-sm   ${
                item?.attendanceId && "bg-green-200"
            }`}
        >
            <td className="text-center py-4">{item?.name}</td>
            <td className="text-center">{item?.capacity}</td>
            <td className="text-center">{item?.teacherId?.name}</td>

            <td className="flex items-center justify-center h-full py-4 gap-2 text-center">
                <StudentList classId={item} setSlassLists={setSlassLists} />

                {/* <button className="btn btn-sm btn-outline-danger rounded-full ml-2 flex justify-center items-center gap-1 ">
                    <Trash size={18} /> Delete
                </button> */}
            </td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Classes</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search classes"
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
            {/* LIST */}
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
                <tbody>{filteredClassLists?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Attendance;
