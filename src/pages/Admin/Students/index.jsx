import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Eye, Plus, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import StudentList from "./StudentDetails";
import ViewStudentDetails from "./ViewStudentDetails";
import EditStudent from "./EditStudent";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    const [transports, setTransports] = useState([]);
    const [classLists, setSlassLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStudents, setFilteredStudents] = useState(students);

    useEffect(() => {
        const filtered = students.filter((item) => {
            const matchesRegno = item?.regno?.toLowerCase().includes(searchTerm?.toLowerCase());
            const matchesClass = item?.classId?.name
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase());
            return matchesRegno || matchesClass;
        });
        setFilteredStudents(filtered);
    }, [searchTerm, students]);
    useEffect(() => {
        const getStudents = async () => {
            try {
                const res = await axios.get(BASE_URL + "/students/all-students", {
                    withCredentials: true,
                });
                const ress = await axios.get(BASE_URL + "/transports", {
                    withCredentials: true,
                });
                const resss = await axios.get(BASE_URL + "/classes", {
                    withCredentials: true,
                });

                setSlassLists(resss?.data?.data?.class);
                console.log(ress?.data?.data);
                setTransports(ress?.data?.data?.transport);
                console.log(res?.data?.data?.students);
                setStudents(res?.data?.data?.students);
            } catch (error) {
                if (error?.response?.data?.message)
                    toast({
                        variant: "destructive",
                        title: error?.response?.data?.message,
                    });
                else {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        getStudents();
    }, []);

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
            key={item._id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-50"
        >
            <td className="text-center py-4 px-6">{item?.regno}</td>
            <td className="text-center">{item?.name}</td>
            <td className="hidden md:table-cell text-center">{item?.classId?.name}</td>
            <td className="hidden md:table-cell text-center w-[400px]">{item?.sex}</td>
            <td className="flex items-center justify-center gap-2 text-center py-4 ">
                <EditStudent
                    item={item}
                    setStudents={setStudents}
                    transports={transports}
                    classLists={classLists}
                />
                <ViewStudentDetails item={item} />
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
                        value={searchTerm} // Bind input value to searchTerm
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    />
                    <div className="flex items-center gap-4 self-end">
                        <StudentList
                            setStudents={setStudents}
                            transports={transports}
                            classLists={classLists}
                        />
                    </div>
                </div>
            </div>

            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-center text-xs font-semibold">
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
                <tbody>{filteredStudents?.map(renderRow)}</tbody> {/* Render filtered students */}
            </table>
        </div>
    );
};
export default Students;
