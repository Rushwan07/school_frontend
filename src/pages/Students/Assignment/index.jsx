import React, { useState } from "react";

const Assignments = () => {
    const assignments = [
        {
            id: 1,
            subject: "Class 9th-A result is published.",
            class: "9th",
            date: "2024-10-01",
            teacher: "Me",
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Assignments</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Subject</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Class</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Date</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-left hidden md:table-cell">Teacher</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <tr key={assignment.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4 border-b border-gray-300">
                                {assignment.subject}
                            </td>
                            {/* <td className="py-4 px-4 border-b border-gray-300">
                            {announcement.class}
                        </td> */}
                            <td className="py-4 px-4 border-b border-gray-300">
                                {assignment.class}
                            </td>
                            <td className="py-4 px-4 border-b border-gray-300">
                                {assignment.date}
                            </td>
                            <td className="py-4 px-4 border-b border-gray-300 hidden md:table-cell">
                                {assignment.teacher}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Assignments;
