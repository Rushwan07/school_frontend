import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateExam from "./CreateExam";
import EditExam from "./EditExam";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Exams = () => {
    const [exams, setExams] = useState([]);

    const [classes, setClasses] = useState([]);

    const columns = [
        { header: "Exam name", accessor: "Exam name" },
        { header: "class", accessor: "class" },
        { header: "Start Date", accessor: "Start Date" },
        { header: "End Date", accessor: "End Date" },

        { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
    ];

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredExams, setFilteredExams] = useState(exams);

    useEffect(() => {
        const filtered = exams.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.description &&
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.classId?.name &&
                    item.classId.name.toLowerCase().includes(searchTerm.toLowerCase())),
        );
        setFilteredExams(filtered);
    }, [searchTerm, exams]);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await axios.delete(BASE_URL + "/exams/" + id);

            setExams((prev) => prev.filter((exam) => exam._id != id));
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

    useEffect(() => {
        const getClass = async () => {
            try {
                const res = await axios.get(BASE_URL + "/classes", {
                    withCredentials: true,
                });

                const ress = await axios.get(BASE_URL + "/exams/admin-exams", {
                    withCredentials: true,
                });

                setExams(ress?.data?.data?.exam);
                setClasses(res?.data?.data?.class);
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
            } finally {
                setLoading(false);
            }
        };
        getClass();
    }, []);

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
            <td className="text-center">{item?.classId?.name}</td>
            {console.log(item?.subjects)}
            <td className=" text-center">{item?.subjects?.[0]?.date?.split("T")[0]}</td>
            <td className="hidden md:table-cell text-center">
                {item?.subjects?.[item?.subjects?.length - 1]?.date?.split("T")[0]}
            </td>

            <td className="flex hidden md:table-cell items-center justify-center gap-2 text-center">
                <EditExam classes={classes} setExams={setExams} item={item} /> &nbsp;&nbsp;&nbsp;
                <Button variant="destructive" size="icon" onClick={() => handleDelete(item?._id)}>
                    <Trash2Icon size={"20"} />
                </Button>
            </td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Exams</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search exams   "
                        className="border rounded px-3 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <CreateExam classes={classes} setExams={setExams} />
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
                <tbody>{filteredExams?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Exams;
