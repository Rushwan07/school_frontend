import { Input } from "@/components/ui/input";
import { ArrowDownAZ, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";

const Exams = () => {
    const [exams, setExams] = useState([
        {
            _id: "670519227e2fd9ab12fc5b8e",
            name: "Final Term Exam",
            description: "Annual exam for the final term",
            classId: {
                _id: "6704ec91fee39a5e6ebd0162",
                name: "X A",
            },
            subjects: [
                {
                    subjectId: {
                        _id: "6704ea5418b730aed6cc5089",
                        name: "Tamil",
                        description: "Description for the subject",
                    },
                    date: "2024-10-08T08:00:00.000Z",
                    _id: "670519227e2fd9ab12fc5b8f",
                },
                {
                    subjectId: {
                        _id: "6704ea5418b730aed6cc5089",
                        name: "English",
                        description: "Description for the subject",
                    },
                    date: "2024-10-09T08:00:00.000Z",
                    _id: "670519227e2fd9ab12fc5b8f",
                },
                {
                    subjectId: {
                        _id: "6704ea5418b730aed6cc5089",
                        name: "Maths",
                        description: "Description for the subject",
                    },
                    date: "2024-10-10T08:00:00.000Z",
                    _id: "670519227e2fd9ab12fc5b8f",
                },
            ],
        },
    ]);

    const columns = [
        { header: "Subject", accessor: "subject" },
        { header: "Class", accessor: "class", style: "hidden md:table-cell" },
        { header: "Date", accessor: "date" },
        { header: "Time", accessor: "time" },
    ];

    const renderRow = (exam) =>
        exam.subjects.map((subject) => (
            <tr
                key={subject._id}
                className="border-b border-gray-200 bg-white shadow-sm rounded even:bg-slate-50 text-sm hover:bg-gray-100"
            >
                <td className="flex items-center gap-4 py-4 px-6">
                    <div>
                        <p className="font-semibold">{subject?.subjectId?.name}</p>
                        <p className="text-xs hidden md:table-cell text-gray-500">
                            {subject?.subjectId?.description}
                        </p>
                    </div>
                </td>
                <td className="text-center text-xs hidden md:table-cell">{exam?.classId?.name}</td>
                <td className="text-center">{new Date(subject?.date).toLocaleDateString()}</td>
                <td className="text-center">
                    {new Date(subject?.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </td>
            </tr>
        ));

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Exam Timetable</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search exam"
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
                    <tr className="bg-gray-100 text-center text-xs font-semibold">
                        {columns.map((column) => (
                            <th
                                key={column.header}
                                className={`px-6 py-3 max-w-[200px] ${column.style}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{exams.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default Exams;
