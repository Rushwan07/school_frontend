import { Input } from "@/components/ui/input";
import { ArrowDownAZ, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import TeacherDetails from "./TeacherDetails"; // Assuming this is a list of teachers to be imported
import ViewTeacherDetails from "./ViewTeacherDetails"; // Updated component to view teacher details
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Subjects", accessor: "subjects", style: "hidden md:table-cell" },
        { header: "Phone", accessor: "phone" },
        { header: "Email", accessor: "email", style: "hidden md:table-cell" },
        { header: "Gender", accessor: "sex", style: "hidden md:table-cell" },
        { header: "Actions", accessor: "Actions" },
    ];
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState(teachers);
    useEffect(() => {
        console.log(teachers);
        const filtered = teachers.filter(
            (item) =>
                item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item?.email?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                item?.phone?.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
        );
        setFilteredTeachers(filtered);
    }, [searchTerm, teachers]);
    useEffect(() => {
        const getTeachers = async () => {
            try {
                const res = await axios.get(BASE_URL + "/teachers/all-teacher");

                setTeachers(res?.data?.data?.teachers);
            } catch (error) {
                console.log(error);
            }
        };
        getTeachers();
    }, []);

    const renderRow = (item) => (
        <tr
            key={item._id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-50"
        >
            <td className="text-center py-4 px-6">{item?.name}</td>

            <td className="text-center hidden md:table-cell">
                {item?.subjects.length > 0
                    ? item?.subjects?.map((sub) => sub?.name).join(", ") // Join subjects into a single string
                    : "--"}
            </td>
            <td className="text-center">{item?.phone}</td>
            <td className="hidden md:table-cell text-center">{item?.email}</td>
            <td className="hidden md:table-cell text-center">{item?.sex}</td>
            <td className="flex items-center justify-center gap-2 text-center py-4">
                <ViewTeacherDetails teacherData={item} /> {/* Pass teacher data to the dialog */}
            </td>
        </tr>
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Teachers</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search by teacher name"
                        className="border rounded px-3 py-2"
                        value={searchTerm} // Set value to the search term
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <TeacherDetails setTeachers={setTeachers} />
                    </div>
                </div>
            </div>
            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-center text-xs font-semibold">
                        {columns?.map((column) => (
                            <th
                                key={column.header}
                                className={`px-6 py-3 max-w-[200px] ${column.style}`}
                            >
                                {column?.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{filteredTeachers?.map(renderRow)}</tbody> {/* Use filtered teachers */}
            </table>
        </div>
    );
};

export default Teachers;
