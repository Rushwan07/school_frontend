import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Pencil, Plus, SlidersHorizontal, Trash } from "lucide-react";
import React, { useState } from "react";

import CreateGrade from "./CreateGrade";

import EditGrade from "./EditGrade";

const Grade = () => {
    const [classLists, setSlassLists] = useState([
        {
            id: 1,
            name: "A+",
            startMark: 5,
            endMark: "20",
        },
    ]);

    const columns = [
        { header: "Grade name", accessor: "Grade name" },
        { header: "Start mark", accessor: "Start mark" },
        { header: "	End mark", accessor: "End mark" },

        { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
    ];

    const renderRow = (item) => (
        <tr
            key={item.id}
            className={`border-b  border-gray-200   rounded  text-sm   ${
                item?.attendanceForToday && "bg-green-100"
            }`}
        >
            <td className="text-center py-4">{item?.name}</td>
            <td className="text-center">{item?.startMark}</td>
            <td className="text-center">{item?.endMark}</td>

            <td className="flex items-center justify-center h-full py-4 gap-2 text-center">
                <EditGrade classId={item?.class} />

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
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                        <CreateGrade />
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
                <tbody>{classLists?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Grade;
