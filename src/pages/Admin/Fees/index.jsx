import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import ConfirmationAlert from "./ConfirmationAlert";

const Fees = () => {
    const [activities, setActivities] = useState([
        {
            id: 1,
            regNo: 342,
            name: "Subin",

            class: "Class A",
            date: "2023-10-01",
            fees: "50",
            isPaid: false,
        },
        {
            id: 1,
            regNo: 342,
            name: "Subin",

            class: "Class A",
            date: "2023-10-01",
            fees: "50",
            isPaid: true,
        },
    ]);

    const columns = [
        { header: "Reg no", accessor: "Reg no" },
        { header: "Student name", accessor: "Student name" },

        { header: "Class", accessor: "Class", style: "hidden md:table-cell" },
        { header: "Fees", accessor: "Fees", style: "hidden md:table-cell" },
        { header: "Due date", accessor: "Due date", style: "hidden md:table-cell" },

        { header: "Status", accessor: "Status" },
    ];
    const renderRow = (item) => (
        <tr
            key={item.id}
            className={`border-b border-gray-200  shadow-md rounded  text-sm   ${
                item?.isPaid ? " bg-green-200 hover:bg-green-100" : "bg-red-200 hover:bg-red-100"
            }`}
        >
            <td className="text-center">{item?.regNo}</td>
            <td className=" gap-4 py-4 px-6 text-center">{item?.name}</td>
            <td className="text-center hidden flex md:table-cell">{item?.class}</td>
            <td className=" text-center hidden flex md:table-cell">{item?.fees}</td>
            <td className="hidden md:table-cell text-center">{item?.date}</td>

            <td className="flex md:table-cell items-center justify-center gap-2 text-center">
                {item?.isPaid ? (
                    <>
                        <i className="fa fa-edit" aria-hidden="true"></i> Paid
                    </>
                ) : (
                    <ConfirmationAlert
                        name={item?.name}
                        regNo={item?.regNo}
                        fees={item?.fees}
                        className={item?.class}
                    />
                )}
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
