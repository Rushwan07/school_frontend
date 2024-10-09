import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";

const Subjects = () => {
    const [subjects, setSubjects] = useState([
        {
            id: 1,
            name: "Maths",
            description: " This is an important update for Class AThis is  ",
            class: "Class A",
            lessions: "5",
            teacher: "teacher's name",
        },
    ]);
    // const [subjects, setSubjects] = useState([
    //     {
    //         _id: "abcd",
    //         name: "Maths",
    //     },
    //     {
    //         _id: "abcd2",
    //         name: "Maths",
    //     },
    //     {
    //         _id: "abcddfd",
    //         name: "Maths",
    //     },
    // ]);

    const [classes, setClasses] = useState([
        {
            _id: "sadfasdf",
            name: "first class",
        },
        {
            _id: "s3432adfasdf",
            name: "first class",
        },
        {
            _id: "sadfasdfasd",
            name: "first class",
        },
        {
            _id: "sadfaasdfasdf",
            name: "first class",
        },
    ]);

    const columns = [
        { header: "Subject name", accessor: "Subject name" },
        { header: "class", accessor: "class" },
        { header: "Lessions", accessor: "Lessions" },
        { header: "Teacher", accessor: "Teacher" },
    ];

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
            <td className="text-center">{item?.class}</td>
            <td className=" text-center">{item?.lessions}</td>
            <td className="hidden md:table-cell text-center">{item?.teacher}</td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Subjects</h1>
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
                <tbody>{subjects?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Subjects;
