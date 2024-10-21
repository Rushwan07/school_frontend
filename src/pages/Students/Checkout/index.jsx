import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Checkout = () => {
    const { id } = useParams();
    const { user, token } = useSelector((state) => state?.user?.user || {});
    const { toast } = useToast();

    const [loading, setLoading] = useState(true);
    const [fees, setFees] = useState({});
    useEffect(() => {
        const getFeesDetails = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/fees/${id}`, {
                    headers: { token },
                });
                setFees(res?.data?.data?.feesDetails || []);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: error?.response?.data?.message || "Error fetching fees.",
                });
            } finally {
                setLoading(false);
            }
        };
        getFeesDetails();
    }, [token, toast]);

    const handlePayment = async () => {
        try {
            const res = await axios.patch(
                `${BASE_URL}/fees/update-status/${fees._id}`,
                {},
                { headers: { token } },
            );
            setFees(res?.data?.data?.feesDetails);

            toast({
                variant: "success",
                title: "Payment Successful",
                description: "Your payment status has been updated.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: error?.response?.data?.message || "Payment update failed.",
            });
        }
    };

    const renderRow = (item) => (
        <tr
            key={item._id}
            className={`border-b border-gray-200 text-sm ${
                item?.isPaid ? "bg-green-200 hover:bg-green-100" : "bg-red-200 hover:bg-red-100"
            }`}
        >
            <td className="text-center">
                {item.fees?.map((fee) => (
                    <div key={fee.name}>{fee.name}</div>
                ))}
            </td>
            <td className="text-center">
                {item.fees?.map((fee) => (
                    <div key={fee.name}>₹{fee.fee}</div>
                ))}
            </td>
            <td className="text-center">{item.isPaid ? "Paid" : "Unpaid"}</td>
        </tr>
    );

    console.log(fees);

    return (
        <div>
            <Card>
                <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
                    <h1 className="text-lg font-semibold mb-5">My Fees Details</h1>
                    <table className="table-auto w-full mx-auto shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-100 text-center text-xs font-semibold">
                                <th className="px-6 py-3">Fee Heads</th>
                                <th className="px-6 py-3">Fees</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : fees ? (
                                renderRow(fees)
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No fees found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {!fees?.isPaid && (
                        <div className="w-full flex justify-end mt-5">
                            <Button onClick={handlePayment} className="bg-green-500 text-white">
                                Pay Now
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Checkout;
