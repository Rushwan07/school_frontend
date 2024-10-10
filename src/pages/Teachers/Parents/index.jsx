import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";

const Parents = () => {
    const [parents, setParents] = useState([
        {
            id: 1,
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
            subjectName: "+91-9999999999",
            description: " This is an important update for Class AThis is  ",
            class: "Test@gmail.com",
            startDate:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas quaerat est, id itaque libero rerum?",
            teacherName: "teacher one",
            time: "11:30 to 12:30",
            duedate: "2023-10-01",
            duration: "110217",
        },
        {
            id: 1,
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
            subjectName: "+91-9999999999",
            description: " This is an important update for Class AThis is  ",
            class: "Test@gmail.com",
            startDate:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas quaerat est, id ",
            teacherName: "teacher one",
            time: "11:30 to 12:30",
            duedate: "2023-10-01",
            duration: "110217",
        },
        {
            id: 1,
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
            subjectName: "+91-9999999999",
            description: " This is an important update for Class AThis is  ",
            class: "Test@gmail.com",
            startDate:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
            teacherName: "teacher one",
            time: "11:30 to 12:30",
            duedate: "2023-10-01",
            duration: "110217",
        },
    ]);

    const columns = [
        { header: "Name", accessor: "tile", style: "hidden md:table-cell" },
        { header: "Email", accessor: "class" },
        { header: "Phone", accessor: "subjectName" },
        { header: "Address", accessor: "startDate" },
        { header: "Child Roll No", accessor: "duration", style: "hidden md:table-cell" },
        // { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
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
            <td className="hidden md:table-cell text-center">{item?.subjectName}</td>
            <td className="hidden md:table-cell text-center w-[400px]">{item?.startDate}</td>
            <td className="hidden md:table-cell text-center ">{item?.duration}</td>
            {/* <td className="flex items-center justify-center gap-2 text-center">
                <button className="btn btn-sm btn-outline-primary rounded-full ">
                    <i className="fa fa-edit" aria-hidden="true"></i> Edit
                </button>
                <button className="btn btn-sm btn-outline-danger rounded-full ml-2 ">
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                </button>
            </td> */}
        </tr>
    );
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Parents</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search by student roll No"
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
                <tbody>{parents?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Parents;
