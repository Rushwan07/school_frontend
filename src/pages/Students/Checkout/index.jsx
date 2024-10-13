import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Checkout = () => {
    const [data, setData] = useState([
        { head: "Tution", fee: "24000", status: "Unpaid" },
        { head: "Transportation", fee: "1400", status: "Unpaid" },
        { head: "Food", fee: "600", status: "Unpaid" },
    ]);

    const renderRow = (item) => (
        <tr
            className={`border-b border-gray-200 shadow-md rounded text-sm ${
                item?.status === "Paid"
                    ? "bg-green-200 hover:bg-green-100"
                    : "bg-red-200 hover:bg-red-100"
            }`}
        >
            <td className="text-center">{item?.head}</td>
            <td className="gap-4 py-4 px-6 text-center">₹ {item?.fee}</td>
            <td className="text-center  md:table-cell">{item?.status}</td>
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
                        <tbody>{data?.map(renderRow)}</tbody>
                    </table>
                    <div className="w-full flex justify-end mt-5">
                        <button className="p-2 bg-green-500 text-white text-[1.2rem] font-semibold rounded hover:bg-green-400 ">
                            Pay Now
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Checkout;
