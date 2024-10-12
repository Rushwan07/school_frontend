import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useToast } from "@/hooks/use-toast";
const Announcements = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    useEffect(() => {
        const getAnouncements = async () => {
            try {
                const res = await axios.get(BASE_URL + "/anouncements/student-anouncement", {
                    headers: { token: token },
                });

                setAnnouncements(res?.data?.data?.announcements);
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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Announcements</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Title</th>
                        {/* <th className="py-2 px-4 border-b border-gray-300 text-left">Class</th> */}
                        <th className="py-2 px-4 border-b border-gray-300 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements?.map((announcement) => (
                        <tr key={announcement?._id} className="hover:bg-gray-50">
                            <td className="py-4 px-4 border-b border-gray-300">
                                <div>
                                    <p className="font-semibold">{announcement?.title}</p>
                                    <p className="text-xs hidden md:table-cell text-gray-500">
                                        {announcement?.description} dsfsafa asdfas fas fd as df as
                                        fa sfas f as fsaf as f sa f asd f asd fas df as df asd f sd
                                        f as dfa sdf sa df asd fasdfasdf a sdf as f asdf a sdf
                                        asdfasfdas sdf as df asd f asd fasdfasdfasdfas f sd
                                        fasdfsadfasdfasdfa ewr ew r ewfdsfsad f as fasdfasdfasdfasdf
                                        sadf
                                    </p>
                                </div>
                            </td>
                            {/* <td className="py-4 px-4 border-b border-gray-300">
                                {announcement.class}
                            </td> */}
                            <td className="py-4 px-4 border-b border-gray-300 w-[15rem]">
                                {announcement?.createdAt?.split("T")[0]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Announcements;
