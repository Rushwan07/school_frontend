import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";

const Events = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            eventname: "Hackethon",
            description: " This is an important update for Class AThis is  ",
            class: "Class A",
            startDate: "2023-10-01",
            startTime: "7:00am",
            endTime: "8:00am",

            duedate: "2023-10-01",
        },
    ]);

    const columns = [
        { header: "Event name", accessor: "Event name" },
        { header: "class", accessor: "class" },
        { header: "startDate", accessor: "startDate" },
        { header: "Due Date", accessor: "Due Date", style: "hidden md:table-cell" },
        { header: "Start time", accessor: "Start time", style: "hidden md:table-cell" },
        { header: "End time", accessor: "End time", style: "hidden md:table-cell" },
        // { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
    ];
    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className="font-semibold">{item?.eventname}</p>
                    <p className="text-xs text-gray-500 hidden md:table-cell">
                        {item?.description}
                    </p>
                </div>
            </td>
            <td className="text-center">{item?.class}</td>
            <td className=" text-center">{item?.startDate}</td>
            <td className="hidden md:table-cell text-center">{item?.duedate}</td>
            <td className=" text-center hidden md:table-cell">{item?.startTime}</td>
            <td className="hidden md:table-cell text-center">{item?.endTime}</td>

            {/* <td className="flex hidden md:table-cell items-center justify-center gap-2 text-center">
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
        <div className="">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Events</h1>
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
                <tbody>{events?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Events;
