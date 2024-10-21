import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StudentFees = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [fees, setFees] = useState([]);

    // Define the columns for the table
    const columns = [
        { header: "Class", accessor: "classId", style: "hidden md:table-cell" },
        { header: "Total Fees", accessor: "totalFees" },
        { header: "Status", accessor: "isPaid" },
        { header: "Action", accessor: "action" },
    ];

    const navigate = useNavigate();
    useEffect(() => {
        const getFeesDetails = async () => {
            setLoading(true);
            try {
                const res = await axios.get(BASE_URL + "/fees/std", {
                    headers: { token: token },
                });
                setFees(res?.data?.data?.feesDetails);
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message || "Uh oh! Something went wrong.";
                toast({ variant: "destructive", title: errorMessage });
            } finally {
                setLoading(false);
            }
        };
        getFeesDetails();
    }, [token, toast]);

    const handlePayFees = (id) => {
        navigate(`checkout/${id}`);
    };

    const handleDownload = (item) => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Fee Invoice", 14, 22);
        doc.setFontSize(12);
        doc.text(`Student Name: ${item?.studentId?.name}`, 14, 40);
        doc.text(`Registration No: ${item?.studentId?.regno}`, 14, 50);
        doc.text(`Class: ${item?.classId?.name}`, 14, 60);

        // Create the invoice data
        const feesData =
            item?.fees?.map((i) => ({
                "Fee Head": i.name,
                Amount: i?.fee,
            })) || []; // Default to an empty array if item.fees is undefined

        // Combine fees data with total and payment status
        const invoiceData = [
            ...feesData,
            { "Fee Head": "Total Fees", Amount: item?.total },
            { "Fee Head": "Payment Status", Amount: item?.isPaid ? "Paid" : "Unpaid" },
        ];

        const tableColumn = ["Fee Head", "Amount"];
        const tableRows = invoiceData.map((fee) => [fee["Fee Head"], fee.Amount]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 80,
            styles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 10,
            },
            headStyles: {
                fillColor: [0, 123, 255],
                textColor: [255, 255, 255],
                fontSize: 12,
            },
            margin: { top: 30 },
        });

        doc.save("fee_invoice.pdf");
    };

    const renderRow = (item) => (
        <tr
            className={`border-b border-gray-200 shadow-md rounded text-sm ${
                item?.isPaid ? "bg-green-200 hover:bg-green-100" : "bg-red-200 hover:bg-red-100"
            }`}
        >
            <td className="text-center">{item?.classId?.name}</td>
            <td className="text-center hidden md:table-cell">{item?.total}</td>
            <td className="text-center">{item?.isPaid ? "Paid" : "Unpaid"}</td>
            <td className="text-center hidden md:table-cell">
                {item?.isPaid ? (
                    <Button className="bg-green-500" onClick={() => handleDownload(item)}>
                        Download
                    </Button>
                ) : (
                    <Button onClick={() => handlePayFees(item._id)}>Pay Fees</Button>
                )}
            </td>
        </tr>
    );
    console.log(fees);
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
