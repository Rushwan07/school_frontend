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

const Lessions = () => {
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
            title: "Integrations and Derivatives",
            subjectName: "Maths",
            description: " This is an important update for Class AThis is  ",
            class: "Class A",
            startDate: "2023-10-01",
            teacherName: "teacher one",
            time: "11:30 to 12:30",
            duedate: "2023-10-01",
            duration: "60",

        },
        {
            id: 1,
            title: "Integrations and Derivatives",
            time: "11:30 to 12:30",

            subjectName: "Maths",
            description: "This is an important update for Class A",
            class: "Class A",
            startDate: "2023-10-01",
            teacherName: "teacher one",
            duedate: "2023-10-01",
            duration: "60",

        },
        {
            id: 1,
            title: "Integrations and Derivatives",
            duration: "60",

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
        { header: "Duration", accessor: "duration", style: "hidden md:table-cell" },
        { header: "Actions", accessor: "Actions", style: "hidden md:table-cell" },
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
            <td className="hidden md:table-cell text-center">{item?.duration}m</td>
            <td className="flex items-center justify-center gap-2 text-center">
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
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Lessons</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search Lesson"
                        className="border rounded px-3 py-2"
                    />
                    <div className="flex items-center gap-4 self-end ">
                        {/* <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button> */}
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <div>
                                    {" "}
                                    <MdAdd size={30} className="cursor-pointer" />{" "}
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Lesson</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        label="Title"
                                        name="title"
                                        onChange={handleChange}
                                        required
                                        className="mb-3"
                                        placeholder="Title"
                                    />
                                    <Textarea
                                        label="Address"
                                        name="address"
                                        onChange={handleChange}
                                        className="mb-3"
                                        placeholder="Description"
                                        required
                                    />
                                    <Select label="Sex" className="mb-3">
                                        <SelectTrigger className="mb-3">
                                            <SelectValue placeholder="Select Subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">MAths</SelectItem>
                                            <SelectItem value="2">Science</SelectItem>
                                            <SelectItem value="3">Physics</SelectItem>
                                            <SelectItem value="4">Chemistry</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select label="Sex" className="mb-3">
                                        <SelectTrigger className="mb-3">
                                            <SelectValue placeholder="Select Class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">Class 9-A</SelectItem>
                                            <SelectItem value="2">Class 10-A</SelectItem>
                                            <SelectItem value="3">Class 10-B</SelectItem>
                                            <SelectItem value="4">Class 10-C</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        label="Date"
                                        type="date"
                                        name="Date"
                                        onChange={handleChange}
                                        required
                                        className="mb-3"
                                    />
                                    <Input
                                        label="Duration"
                                        type="number"
                                        name="duration"
                                        onChange={handleChange}
                                        required
                                        placeholder="Duration in minute"
                                        className="mb-3"
                                    />

                                    <DialogFooter>
                                        <Button type="submit">Create</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
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

export default Lessions;
