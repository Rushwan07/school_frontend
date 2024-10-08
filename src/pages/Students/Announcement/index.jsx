import React from "react";

const Announcements = () => {
    const announcements = [
        { id: 1, title: "Class 9th-A result is published.", class: "9th", date: "2024-10-01" },
        {
            id: 2,
            title: "Tommorow exam has been canceled enjoy students!!  ",
            class: "9th hsghgy",
            date: "2024-10-02",
        },
        { id: 3, title: "Announcement 3", class: "9th", date: "2024-10-03" },
    ];

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
                    {announcements.map((announcement) => (
                        <tr key={announcement.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4 border-b border-gray-300">
                                {announcement.title}
                            </td>
                            {/* <td className="py-4 px-4 border-b border-gray-300">
                                {announcement.class}
                            </td> */}
                            <td className="py-4 px-4 border-b border-gray-300">
                                {announcement.date}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Announcements;
