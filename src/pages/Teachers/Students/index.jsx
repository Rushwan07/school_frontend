import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
const Student = () => {
    const [students, setStudents] = useState([

        {
            id: 1,
            name: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
            reg: "0217",
            // description: " This is an important update for Class AThis is  ",
            class: "Test@gmail.com",
            gender: "Male",
            parent: "Lorem ipsum dolor sit amet consectetur.",
            phone: "+91-9999999999",

        },
    ]);

    const columns = [
        { header: "Name", accessor: "name", style: "hidden md:table-cell" },
        { header: "RegNo", accessor: "reg" },
        { header: "Class", accessor: "class" },
        { header: "Gender", accessor: "gender" },
        { header: "Parent Name", accessor: "parent", style: "hidden md:table-cell" },
        { header: "Parent Phone", accessor: "phone", },
        // { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
    ];

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className="font-semibold">{item?.name}</p>
                    {/* <p className="text-xs text-gray-500">{item?.name}</p> */}
                </div>
            </td>
            <td className="text-center">{item?.reg}</td>
            <td className="hidden md:table-cell text-center">{item?.class}</td>
            <td className="hidden md:table-cell text-center ">{item?.gender}</td>
            <td className="hidden md:table-cell text-center w-[400px] ">{item?.name}</td>
            <td className="hidden md:table-cell text-center ">{item?.phone}</td>
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
            {" "}
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

export default Student;
