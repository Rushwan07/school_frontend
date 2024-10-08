import { Input } from "@/components/ui/input";
import { ArrowDownAZ, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
const Results = () => {
    const [assignments, setAssignments] = useState([
        {
            id: 1,
            subjectName: "Maths",
            class: "Class A",
            marks: "60",
            result: "Pass",
        },
        {
            id: 2,
            subjectName: "History",
            class: "Class A",
            marks: "10",
            result: "Fail",
        },
    ]);
    const columns = [
        { header: "Subject", accessor: "subjectName" },
        // { header: "Title", accessor: "tile",style: "hidden md:table-cell" },
        { header: "Class", accessor: "class", style: "hidden md:table-cell" },
        { header: "Marks", accessor: "startDate" },
        { header: "Result", accessor: "duration" },
    ];

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className=" font-semibold">{item?.subjectName}</p>
                </div>
            </td>
            <td className="hidden md:table-cell text-center">{item?.class}</td>
            <td className="text-center">{item?.marks}</td>

            <td
                className={`text-center text-white ${
                    item?.result === "Pass" ? "bg-green-500" : "bg-red-500"
                }`}
            >
                {item?.result}
            </td>

            {/* <td className="hidden md:table-cell text-center">{item?.duration}m</td> */}
        </tr>
    );
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Results</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search Lesson"
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
                <tbody>{assignments?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Results;
