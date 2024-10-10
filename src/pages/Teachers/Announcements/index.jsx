import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import CreateAnouncementDialog from "./CreateAnouncementDialog";

const AnnouncementListPage = () => {
    const [anouncements, setAnounceMents] = useState([
        {
            id: 1,
            title: "Important Announcement",
            description: "This is an important update for Class A",
            class: "Class A",
            date: "2023-10-01",
        },
        {
            id: 2,
            title: "Upcoming Event",
            description: "Class B has an upcoming event",
            class: "Class B",
            date: "2023-10-15",
        },
        // Add more announcements here
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

    const [data, setData] = useState({
        title: "",
        description: "",
        classId: "",
    });

    const columns = [
        { header: "Title", accessor: "title" },
        { header: "Class", accessor: "class" },
        { header: "Date", accessor: "date", className: "hidden md:table-cell" },
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
            <td>{item?.class}</td>
            <td className="hidden md:table-cell">{item?.date}</td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Announcements</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search announcements"
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
            {/* LIST */}
            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-left text-xs font-semibold">
                        {columns?.map((column) => (
                            <th key={column.header} className="px-6 py-3">
                                {column?.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{anouncements?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default AnnouncementListPage;
