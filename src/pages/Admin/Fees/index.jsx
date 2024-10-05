import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import CreateActivity from "./CreateActivity";
const Fees = () => {
    const [activities, setActivities] = useState([
        {
            id: 1,
            name: "Subin",

            class: "Class A",
            date: "2023-10-01",
            fees: "50",
        },
    ]);

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
        { header: "Student name", accessor: "Student name" },
        { header: "Class", accessor: "Class" },
        { header: "Fees", accessor: "Fees" },
        { header: "Due date", accessor: "Due date", style: "hidden md:table-cell" },

        { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
    ];
    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <p className="font-semibold">{item?.name}</p>
            </td>
            <td className="text-center">{item?.class}</td>
            <td className=" text-center">{item?.fees}</td>
            <td className="hidden md:table-cell text-center">{item?.date}</td>

            <td className=" hidden flex md:table-cell items-center justify-center gap-2 text-center">
                <button className="btn btn-sm btn-outline-primary rounded-full ">
                    <i className="fa fa-edit" aria-hidden="true"></i> Edit
                </button>
                <button className="btn btn-sm btn-outline-danger rounded-full ml-2 ">
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                </button>
            </td>
        </tr>
    );
    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Activities</h1>
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
                        <CreateActivity classes={classes} />
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
                <tbody>{activities?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Fees;
