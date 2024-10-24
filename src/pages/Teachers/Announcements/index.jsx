import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateAnouncementDialog from "./CreateAnouncementDialog";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AnnouncementListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");


    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const [anouncements, setAnounceMents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredAnouncements, setFilteredAnouncements] = useState(anouncements);


    const [data, setData] = useState({
        title: "",
        description: "",
        classId: "",
    });

    const columns = [
        { header: "Title", accessor: "title" },
        { header: "Class", accessor: "class" },
        { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    ];

    useEffect(() => {
        const filtered = anouncements.filter(
            (item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.classId?.name &&
                    item.classId.name.toLowerCase().includes(searchTerm.toLowerCase())),
        );
        setFilteredAnouncements(filtered);
    }, [searchTerm, anouncements]);

    useEffect(() => {
        const get = async () => {
            try {
                console.log("working fine");
                const res = await axios.get(BASE_URL + `/anouncements/teacher-anouncement`, {
                    headers: { token: token },
                });

                setAnounceMents(res?.data?.data?.announcements);
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
        get();
    }, []);
    console.log(anouncements);

    const renderRow = (item) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 bg-white shadow-md rounded even:bg-slate-50 text-sm hover:bg-gray-100"
        >
            <td className="flex items-center gap-4 py-4 px-6">
                <div>
                    <p className="font-semibold">{item?.title}</p>
                    <p className="text-xs text-gray-500">{item?.description}</p>
                </div>
            </td>
            <td>{item?.classId?.name || "All Class"}</td>
            <td className="hidden md:table-cell">{item?.createdAt?.split("T")[0]}</td>
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
                        onChange={(e) => setSearchTerm(e.target.value)}

                    />
                    {/* <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                    </div> */}
                </div>
            </div>
            {/* LIST */}
            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-left text-xs font-semibold">
                        {columns?.map((column) => (
                            <th key={column.header} className="px-6 py-3">
                                {column?.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{filteredAnouncements?.map(renderRow)}</tbody>
            </table>
        </div>
    );
};

export default AnnouncementListPage;
