import React from "react";
import { NavLink } from "react-router-dom";
import {
    Home,
    MicVocal,
    BookOpen,
    CheckSquare,
    Calendar,
    CalendarDays,
    ClipboardList,
    Activity,
    DollarSign,
    BarChart,
    Users,
    Award,
    User,
    Clipboard,
    Bus,
    LayoutDashboard,
} from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = () => {
    const links = [
        {
            text: "Dashboard",
            link: "/admin/dashboard",
            icon: <Home />,
        },
        {
            text: "Anouncements",
            link: "/admin/anouncement",
            icon: <MicVocal />,
        },
        {
            text: "Assignments",
            link: "/admin/assignment",
            icon: <ClipboardList />,
        },
        {
            text: "Attendance",
            link: "/admin/attendance",
            icon: <CheckSquare />,
        },
        {
            text: "Class",
            link: "/admin/class",
            icon: <Calendar />,
        },
        {
            text: "Events",
            link: "/admin/events",
            icon: <CalendarDays />,
        },
        {
            text: "Exams",
            link: "/admin/exams",
            icon: <Clipboard />,
        },
        {
            text: "Extracurricular Activities",
            link: "/admin/extracurricular-activities",
            icon: <Activity />,
        },
        {
            text: "Fees details",
            link: "/admin/fees",
            icon: <DollarSign />,
        },

        {
            text: "Lessons",
            link: "/admin/lessons",
            icon: <BookOpen />,
        },
        {
            text: "Parents",
            link: "/admin/parents",
            icon: <Users />,
        },
        {
            text: "Results",
            link: "/admin/results",
            icon: <Award />,
        },
        {
            text: "Students",
            link: "/admin/students",
            icon: <User />,
        },
        {
            text: "Subjects",
            link: "/admin/subjects",
            icon: <ClipboardList />,
        },
        {
            text: "Teachers",
            link: "/admin/teachers",
            icon: <Users />,
        },
        {
            text: "Transportations",
            link: "/admin/transportations",
            icon: <Bus />,
        },
    ];
    return (
        <div className="bg-secondary  flex flex-col gap-1 p-2 px-5">
            <div className="w-fit px-2 md:w-full md:px-5 py-3 text-xl font-bold text-primary flex justify-center items-center gap-2">
                <LayoutDashboard />
                <span className="hidden md:inline">Admin Dashboard</span>
            </div>
            {links.map((link) => (
                <TooltipProvider>
                    {" "}
                    <Tooltip>
                        <TooltipTrigger>
                            {" "}
                            <NavLink
                                key={link?.link}
                                to={link?.link}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 rounded-md w-fit px-2 md:w-full md:px-5 py-2 duration-100 ${
                                        isActive
                                            ? "bg-primary text-white"
                                            : "hover:bg-primary  text-slate-700 hover:text-white"
                                    }`
                                }
                            >
                                {link?.icon}
                                <span className="hidden md:inline">{link?.text}</span>
                            </NavLink>
                            <TooltipContent>
                                <p>{link?.text}</p>
                            </TooltipContent>
                        </TooltipTrigger>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
};

export default Sidebar;
