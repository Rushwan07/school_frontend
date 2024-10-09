import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import CreateAssignment from "./CreateAssignment";
import EditAssignment from "./EditAssignment";
import { Button } from "@/components/ui/button";

const Assignments = () => {
    const [assignments, setAssignments] = useState([
        {
            id: 1,
            title: "title",
            subjectName: "Maths",
            description: " This is an important update for Class AThis is  ",
            class: "Class A",
            startDate: "2023-10-01",
            teacherName: "teacher one",

            duedate: "2023-10-01",
        },
        {
            id: 1,
            title: "title",
            subjectName: "Maths",
            description: "This is an important update for Class A",
            class: "Class A",
            startDate: "2023-10-01",
            teacherName: "teacher one",
            duedate: "2023-10-01",
        },
        {
            id: 1,
            title: "title",
            subjectName: "Maths",
            description: "This is an important update for Class A",
            class: "Class A",
            startDate: "2023-10-01",
            teacherName: "teacher one",

            duedate: "2023-10-01",
        },
    ]);

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
            key={item.id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className="font-semibold">{item?.title}</p>
                    <p className="text-xs text-gray-500">{item?.description}</p>
                </div>
            </td>
            <td className="text-center">{item?.class}</td>
            <td className="text-center">{item?.subjectName}</td>
            <td className="hidden md:table-cell text-center">{item?.startDate}</td>
            <td className="hidden md:table-cell text-center">{item?.duedate}</td>

            <td className="flex items-center gap-2 py-3 ">
                <EditAssignment item={item} />
                <Button variant="destructive" size="icon">
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
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                        <CreateAssignment />
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
                <tbody>{assignments?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Assignments;
