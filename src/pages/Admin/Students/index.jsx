import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Eye, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import StudentList from "./StudentDetails";
import ViewStudentDetails from "./ViewStudentDetails";

const Students = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "student1",
            regNo: "12321",
            class: "first",
            sex: "Male",
            parentId: {
                name: "abc parent",
                email: "abc@gmail.com",
                phone: "1232132131",

                address: "address details a",
            },
        },
    ]);

    const columns = [
        { header: "Reg no", accessor: "Reg no" },
        { header: "Name", accessor: "Name", style: "hidden md:table-cell" },
        { header: "Class", accessor: "Class" },
        { header: "Gender", accessor: "Gender", style: "hidden md:table-cell" },
        // { header: "Child Roll No", accessor: "duration", style: "hidden md:table-cell" },
        { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
    ];

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-50"
        >
            <td className="text-center  py-4 px-6">{item?.regNo}</td>
            <td className="text-center">{item?.name}</td>
            <td className="hidden md:table-cell text-center">{item?.class}</td>
            <td className="hidden md:table-cell text-center w-[400px]">{item?.sex}</td>
            {/* <td className="hidden md:table-cell text-center ">{item?.duration}</td> */}
            <td className="flex items-center justify-center gap-2 text-center  py-4 ">
                <ViewStudentDetails />
            </td>
        </tr>
    );
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Students</h1>
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
                        <StudentList />
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
                <tbody>{students?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Students;
