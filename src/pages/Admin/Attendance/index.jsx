import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Pencil, Plus, SlidersHorizontal, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import StudentList from "./StudentList";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import EditAttendanceList from "./EditAttendance";
import { DatePicker } from "./DobCalendar";
import ViewAttendanceDetails from "./ViewAttendanceDetails";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Attendance = () => {
    const [classLists, setSlassLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());

    const columns = [
        { header: "Class", accessor: "Class" },
        { header: "Capacity", accessor: "Capacity" },
        { header: "	Supervisor", accessor: "	Supervisor", style: "hidden md:table-cell" },

        { header: "Actions", accessor: "Actions" },
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
            className={`border-b border-gray-200 rounded text-sm ${
                item?.attendanceId &&
                !new Date(date).toDateString() === new Date().toDateString() &&
                "bg-green-200"
            }`}
        >
            <td className="text-center py-4">{item?.name}</td>
            <td className="text-center">{item?.capacity}</td>
            <td className="text-center hidden md:table-cell">{item?.teacherId?.name}</td>

            <td className="flex items-center justify-center h-full py-4 gap-2 text-center">
                {/* Check if the selected date is today */}
                {new Date(date).toDateString() === new Date().toDateString() ? (
                    item?.attendanceId ? (
                        <EditAttendanceList classId={item} setSlassLists={setSlassLists} />
                    ) : (
                        <StudentList classId={item} setSlassLists={setSlassLists} />
                    )
                ) : (
                    <ViewAttendanceDetails
                        classId={item}
                        setSlassLists={setSlassLists}
                        date={date}
                    />
                )}
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Attendance</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search classes"
                        className="border rounded px-3 py-2"
                        value={searchTerm} // Bind input value to searchTerm
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    />
                    <div className="flex items-center gap-4 self-end">
                        <DatePicker setDate={setDate} />
                    </div>
                </div>
            </div>

            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-center text-xs font-semibold">
                        {columns?.map((column) => (
                            <th
                                key={column.header}
                                className={`px-6 py-3 max-w-[200px] ${column.style}`}
                            >
                                {column?.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{filteredClassLists?.map(renderRow)}</tbody> {/* Use filteredClassLists */}
            </table>
        </div>
    );
};

export default Attendance;
