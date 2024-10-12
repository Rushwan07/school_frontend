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
    const [fees, setFees] = useState({});

    const columns = [
        { header: "Reg no", accessor: "Reg no" },
        { header: "Student name", accessor: "Student name" },
        { header: "Class", accessor: "Class", style: "hidden md:table-cell" },
        { header: "Base Fees", accessor: "Base Fees", style: "hidden md:table-cell" },
        {
            header: "Transportation Fees",
            accessor: "Transportation Fees",
            style: "hidden md:table-cell",
        },
        {
            header: "Total Fees",
            accessor: "Total Fees",
        },
        { header: "Due date", accessor: "Due date", style: "hidden md:table-cell" },
        { header: "Status", accessor: "Status" },
    ];

    const navigate = useNavigate();

    const handlePayFees = () => {
        navigate(`checkout?regNo=${user?.regno}&name=${user?.name}&fees=${fees?.baseFees}`);
    };

    useEffect(() => {
        const getFeesDetails = async () => {
            try {
                const res = await axios.get(BASE_URL + "/fees/student-fees", {
                    headers: { token: token },
                });

                console.log(res?.data?.data?.feesDetails);
                setFees(res?.data?.data?.feesDetails[0]);
            } catch (error) {
                console.log(error);
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
        getFeesDetails();
    }, []);

    const renderRow = () => (
        <tr
            className={`border-b border-gray-200 shadow-md rounded text-sm ${
                fees?.isPaid ? "bg-green-200 hover:bg-green-100" : "bg-red-200 hover:bg-red-100"
            }`}
        >
            <td className="text-center">{user?.regno}</td>
            <td className="gap-4 py-4 px-6 text-center">{user?.name}</td>
            <td className="text-center hidden md:table-cell">{user?.classId?.name}</td>
            <td className="text-center hidden md:table-cell">{fees?.baseFees}</td>
            <td className="text-center hidden md:table-cell">{fees?.transportationFees}</td>
            <td className="text-center ">{fees?.totalFees}</td>
            <td className="hidden md:table-cell text-center">{fees?.date?.split("T")[0]}</td>
            <td className="flex items-center justify-center py-4 gap-2 text-center">
                {fees?.isPaid ? "Paid" : <Button onClick={handlePayFees}>Pay Fees</Button>}
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
