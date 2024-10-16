import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal, Trash, Trash2, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateAnouncementDialog from "./CreateAnouncementDialog";
import EditAnouncementDialog from "./EditAnouncementDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import Announcements from "@/pages/Students/Announcement";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AnnouncementListPage = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [anouncements, setAnounceMents] = useState([]);

    const columns = [
        { header: "Title", accessor: "title", className: "text-center " },
        { header: "Class", accessor: "class", className: "text-center" },
        { header: "Date", accessor: "date", className: "hidden md:table-cell" },
        { header: "Actions", accessor: "action" },
    ];

    useEffect(() => {
        const getAnouncements = async () => {
            try {
                const res = await axios.get(BASE_URL + "/anouncements/admin-anouncement", {
                    headers: { token: token },
                });
                console.log(res?.data?.data?.announcement);
                setAnounceMents(res?.data?.data?.announcement);
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
        getAnouncements();
    }, []);

    const handleRemove = async (id) => {
        try {
            if (id) {
                // Make delete request to the server
                const res = await axios.delete(`${BASE_URL}/anouncements/${id}`);

                // Show success message

                // Update the state to remove the deleted cruise from the UI
                setAnounceMents((prevAnnouncement) =>
                    prevAnnouncement.filter((announce) => announce._id !== id),
                );
            }
        } catch (error) {
            // Show error message
            console.error(error);
        }
    };
    console.log(anouncements);
    const renderRow = (item) => (
        <tr
            key={item._id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className="font-semibold">{item?.title}</p>
                    <p className="text-xs text-gray-500">{item?.description}</p>
                </div>
            </td>
            <td className="text-center">{item?.classId?.name || "All class"}</td>
            <td className="hidden md:table-cell">{item?.createdAt?.split("T")[0]}</td>
            <td className="flex items-center gap-2 py-3 ">
                <EditAnouncementDialog item={item} setAnounceMents={setAnounceMents} />

                <Button onClick={() => handleRemove(item?._id)} variant="destructive" size="icon">
                    <Trash2Icon size={"20"} />
                </Button>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">All Announcements</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search announcements"
                        className="border rounded px-3 py-2"
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                        <CreateAnouncementDialog setAnounceMents={setAnounceMents} />
                    </div>
                </div>
            </div>
            {/* LIST */}
            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-left text-xs font-semibold">
                        {columns?.map((column) => (
                            <th key={column.header} className={`px-6 py-3 ${column?.className}`}>
                                {column?.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{anouncements?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default AnnouncementListPage;
