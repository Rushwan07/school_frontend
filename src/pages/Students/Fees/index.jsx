import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationAlert from "./ConfirmationAlert";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const StudentFees = () => {
    // This would ideally come from an API based on the logged-in student

    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [fees, setFees] = useState([
        {
            class: "9th A",
            year: "2024-2025",
            total: "20000",
            status: "Unpaid",
            _id: "4",
        },
        {
            class: "8th A",
            year: "2024-2025",
            total: "20000",
            _id: "4",

            status: "Paid",
        },
        {
            class: "7th A",
            year: "2024-2025",
            total: "20000",
            _id: "4",
            status: "Paid",
        },
    ]);

    const columns = [
        // { header: "Reg no", accessor: "Reg no" },
        // { header: "Student name", accessor: "Student name" },
        { header: "Class", accessor: "Class", style: "hidden md:table-cell" },
        { header: "Year", accessor: "year", style: "hidden md:table-cell" },
        // { header: "Base Fees", accessor: "Base Fees", style: "hidden md:table-cell" },
        // {
        //     header: "Transportation Fees",
        //     accessor: "Transportation Fees",
        //     style: "hidden md:table-cell",
        // },
        {
            header: "Total Fees",
            accessor: "Total Fees",
        },
        // { header: "Due date", accessor: "Due date", style: "hidden md:table-cell" },
        { header: "Status", accessor: "Status" },
        { header: "Action", accessor: "action" },
    ];

    const navigate = useNavigate();

    const handlePayFees = (id) => {
        console.log(id);
        navigate(`checkout?regNo=${user?.regno}&${id}`);
    };

    // useEffect(() => {
    //     const getFeesDetails = async () => {
    //         try {
    //             const res = await axios.get(BASE_URL + "/fees/student-fees", {
    //                 headers: { token: token },
    //             });

    //             console.log("Feess", res?.data?.data?.feesDetails);
    //             setFees(res?.data?.data?.feesDetails[0]);
    //         } catch (error) {
    //             console.log(error);
    //             if (error?.response?.data?.message)
    //                 toast({
    //                     variant: "destructive",
    //                     title: error?.response?.data?.message,
    //                 });
    //             else {
    //                 toast({
    //                     variant: "destructive",
    //                     title: "Uh oh! Something went wrong.",
    //                     description: "There was a problem with your request.",
    //                 });
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     getFeesDetails();
    // }, []);

    const renderRow = (item) => (
        <tr
            className={`border-b border-gray-200 shadow-md rounded text-sm ${
                item?.status === "Paid"
                    ? "bg-green-200 hover:bg-green-100"
                    : "bg-red-200 hover:bg-red-100"
            }`}
        >
            <td className="text-center">{item?.class}</td>
            <td className="gap-4 py-4 px-6 text-center">{item?.year}</td>
            <td className="text-center hidden md:table-cell">{item?.total}</td>
            <td className="text-center ">{item?.status}</td>
            {/* <td className="hidden md:table-cell text-center">{fees?.date?.split("T")[0]}</td> */}
            <td className="text-center hidden md:table-cell">
                {item?.status === "Paid" ? (
                    <Button className="bg-green-500">Download</Button>
                ) : (
                    <Button onClick={() => handlePayFees(item._id)}>Pay Fees</Button>
                )}
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
                <tbody>{fees?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default StudentFees;
