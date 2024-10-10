import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

const Exams = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated locally!");
        setIsOpen(false); // Close the dialog
    };

    const [teacher, setTeacher] = useState({
        profile:
            "https://images.pexels.com/photos/16094046/pexels-photo-16094046/free-photo-of-man-using-chatgpt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        username: "teacher123",
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        bloodType: "O+",
        sex: "MALE",
        birthday: "1980-01-01",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prev) => ({ ...prev, [name]: value }));
    };

    const [assignments, setAssignments] = useState([
        {
            id: 1,
            title: "Unit test",
            subjectName: "Maths",
            description: " This is an important update for Class AThis is  ",
            class: "Class A",
            startDate: "2023-10-01",
            teacherName: "teacher one",
            time: "11:30 to 12:30",
            duedate: "2023-10-01",
        },
        {
            id: 1,
            title: "Unit test",
            time: "11:30 to 12:30",

            subjectName: "Maths",
            description: "This is an important update for Class A",
            class: "Class A",
            startDate: "2023-10-01",
            teacherName: "teacher one",
            duedate: "2023-10-01",
        },
        {
            id: 1,
            title: "Unit test",
            time: "11:30 to 12:30",

            subjectName: "Maths",
            description: "This is an important update for Class A",
            class: "Class A",
            startDate: "2023-10-01",
            teacherName: "teacher one",

            duedate: "2023-10-01",
        },
    ]);

    const columns = [
        { header: "Title", accessor: "tile", style: "hidden md:table-cell" },
        { header: "class", accessor: "class" },
        { header: "subjectName", accessor: "subjectName" },
        { header: "startDate", accessor: "startDate" },
        // { header: "Time", accessor: "time", style: "hidden md:table-cell" },
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
            <td className="hidden md:table-cell text-center">{item?.startDate}</td>
            {/* <td className="hidden md:table-cell text-center">{item?.time}</td> */}
        </tr>
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Exams</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search Exam"
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

export default Exams;
