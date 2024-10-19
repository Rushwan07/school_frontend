import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import ConfirmationAlert from "../Fees/ConfirmationAlert";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Checkout = () => {
    const [data, setData] = useState([
        { head: "Base Fees" },
        { head: "Transportation Fees" },
        { head: "Total Fees" },
    ]);

    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [fees, setFees] = useState([]);

    useEffect(() => {
        const getFeesDetails = async () => {
            console.log("1");
            try {
                console.log("2");

                const res = await axios.get(BASE_URL + "/fees/student-fees ", {
                    headers: { token: token },
                });
                console.log("3");

                console.log(res?.data?.data?.feesDetails);

                setFees(res?.data?.data?.feesDetails);
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
        getFeesDetails();
    }, []);

    const handlePayment = async () => {
        try {
            const res = await axios.patch(
                `${BASE_URL}/fees/update-status`,
                {},
                {
                    headers: {
                        token: token,
                    },
                },
            );

            setFees((prev) =>
                prev.map((feesDetails) =>
                    feesDetails?._id === res?.data?.data?.feesDetails._id
                        ? res?.data?.data?.feesDetails
                        : feesDetails,
                ),
            );
            toast({
                variant: "success",
                title: "Payment Successful",
                description: "Your payment status has been updated.",
            });
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Payment update failed.";
            toast({
                variant: "destructive",
                title: errorMessage,
            });
        }
    };
    const renderRow = (item) => (
        <tr
            className={`border-b border-gray-200 shadow-md rounded text-sm ${
                item?.isPaid ? "bg-green-200 hover:bg-green-100" : "bg-red-200 hover:bg-red-100"
            }`}
        >
            <td className="text-center">Base fee | Transportation Fee </td>
            <td className="gap-4 py-4 px-6 text-center">
                ₹ {item?.baseFees} | {item?.transportationFees}
            </td>
            <td className="text-center  md:table-cell">{item?.isPaid ? "Paid" : "Unpaid"}</td>
            {/* <td className="text-center ">{item?.status}</td> */}
            {/* <td className="hidden md:table-cell text-center">{fees?.date?.split("T")[0]}</td> */}
            {/* <td className="text-center hidden md:table-cell">
                {item?.status === "Paid" ? (
                    <Button className="bg-green-500">Download</Button>
                ) : (
                    <Button>Pay Fees</Button>
                )}
            </td> */}
        </tr>
    );

    const columns = [
        // { header: "Reg no", accessor: "Reg no" },
        // { header: "Student name", accessor: "Student name" },
        { header: "Fee Heads", accessor: "head" },
        { header: "Fees", accessor: "year" },
        // { header: "Base Fees", accessor: "Base Fees", style: "hidden md:table-cell" },
        // {
        //     header: "Transportation Fees",
        //     accessor: "Transportation Fees",
        //     style: "hidden md:table-cell",
        // },
        // {
        //     header: "Total Fees",
        //     accessor: "Total Fees",
        // },
        // { header: "Due date", accessor: "Due date", style: "hidden md:table-cell" },
        { header: "Status", accessor: "Status" },
        // { header: "Action", accessor: "action" },
    ];
    return (
        <div>
            <Card className="">
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
                    {!fees[0]?.isPaid && (
                        <div className="w-full flex justify-end mt-5">
                            <button
                                onClick={handlePayment}
                                className="p-2 bg-green-500 text-white text-[1.2rem] font-semibold rounded hover:bg-green-400 "
                            >
                                Pay Now
                            </button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Checkout;
