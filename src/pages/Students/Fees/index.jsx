import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationAlert from "./ConfirmationAlert";
import { Button } from "@/components/ui/button";

const StudentFees = () => {
    // This would ideally come from an API based on the logged-in student
    const student = {
        regNo: 342,
        name: "Subin",
        class: "Class A",
        date: "2023-10-01",
        fees: "50",
        isPaid: false,
    };

    const columns = [
        { header: "Reg no", accessor: "Reg no" },
        { header: "Student name", accessor: "Student name" },
        { header: "Class", accessor: "Class", style: "hidden md:table-cell" },
        { header: "Fees", accessor: "Fees", style: "hidden md:table-cell" },
        { header: "Due date", accessor: "Due date", style: "hidden md:table-cell" },
        { header: "Status", accessor: "Status" },
    ];

    const navigate = useNavigate();

    const handlePayFees = () => {
        // Navigate to checkout page, you can pass the student data as query params or use state management
        navigate(`/checkout?regNo=${student.regNo}&name=${student.name}&fees=${student.fees}`);
    };

    const renderRow = () => (
        <tr
            className={`border-b border-gray-200 shadow-md rounded text-sm ${
                student?.isPaid ? "bg-green-200 hover:bg-green-100" : "bg-red-200 hover:bg-red-100"
            }`}
        >
            <td className="text-center">{student?.regNo}</td>
            <td className="gap-4 py-4 px-6 text-center">{student?.name}</td>
            <td className="text-center hidden md:table-cell">{student?.class}</td>
            <td className="text-center hidden md:table-cell">{student?.fees}</td>
            <td className="hidden md:table-cell text-center">{student?.date}</td>
            <td className="flex items-center justify-center py-4 gap-2 text-center">
                {student?.isPaid ? "Paid" : <Button onClick={handlePayFees}>Pay Fees</Button>}
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">My Fees Details</h1>
            </div>
            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-center text-xs font-semibold">
                        {columns.map((column) => (
                            <th
                                key={column.header}
                                className={`px-6 py-3 max-w-[200px] ${column.style}`}
                            >
                                {column?.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{renderRow()}</tbody>
            </table>
        </div>
    );
};

export default StudentFees;
