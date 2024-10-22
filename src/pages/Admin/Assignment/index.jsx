import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateAssignment from "./CreateAssignment";
import EditAssignment from "./EditAssignment";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Assignments = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const [assignments, setAssignments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAssignments, setFilteredAssignments] = useState(assignments);

    useEffect(() => {
        const filtered = assignments.filter(
            (item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item?.subjectId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.classId?.name &&
                    item.classId.name.toLowerCase().includes(searchTerm.toLowerCase())),
        );
        setFilteredAssignments(filtered);
    }, [searchTerm, assignments]);
    useEffect(() => {
        const getAssignments = async () => {
            try {
                const res = await axios.get(BASE_URL + "/assignments/admin-assignment", {
                    headers: { token: token },
                });
                setAssignments(res?.data?.data?.assignments);
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
                const res = await axios.delete(`${BASE_URL}/assignments/${id}`);

                // Show success message

                // Update the state to remove the deleted cruise from the UI
                setAssignments((prevAnnouncement) =>
                    prevAnnouncement.filter((announce) => announce._id !== id),
                );
            }
        } catch (error) {
            // Show error message
            console.error(error);
        }
    };
    const columns = [
        { header: "Title", accessor: "Title" },
        { header: "class", accessor: "class" },
        { header: "Subject", accessor: "Subject", style: "hidden md:table-cell" },
        { header: "startDate", accessor: "startDate" },
        { header: "Due Date", accessor: "Due Date", style: "hidden md:table-cell" },

        { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
    ];
    const renderRow = (item) => (
        <tr
            key={item._id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className="font-semibold">{item?.title}</p>
                    <p className="text-xs text-gray-500">{item?.description}</p>
                </div>
            </td>
            <td className="text-center">{item?.classId?.name}</td>
            <td className="text-center">{item?.subjectId?.name}</td>
            <td className="hidden md:table-cell text-center">{item?.startDate?.split("T")[0]}</td>
            <td className="hidden md:table-cell text-center">{item?.dueDate?.split("T")[0]}</td>

            <td className="flex items-center gap-2 py-3 ">
                <EditAssignment item={item} setAssignments={setAssignments} />
                <Button onClick={() => handleRemove(item?._id)} variant="destructive" size="icon">
                    <Trash2Icon size={"20"} />
                </Button>
            </td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Assignments</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search assignments"
                        className="border rounded px-3 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                        <CreateAssignment setAssignments={setAssignments} />
                    </div>
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
                <tbody>{filteredAssignments?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Assignments;
