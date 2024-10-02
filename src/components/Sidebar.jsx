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
            link: "/dashboard",
            icon: <Home />,
        },
        {
            text: "Anouncements",
            link: "/anouncements",
            icon: <MicVocal />,
        },
        {
            text: "Assignments",
            link: "/assignments",
            icon: <ClipboardList />,
        },
        {
            text: "Attendance",
            link: "/attendences",
            icon: <CheckSquare />,
        },
        {
            text: "Class",
            link: "/classes",
            icon: <Calendar />,
        },
        {
            text: "Events",
            link: "/events",
            icon: <CalendarDays />,
        },
        {
            text: "Exams",
            link: "/Exams",
            icon: <Clipboard />,
        },
        {
            text: "Extracurricular Activities",
            link: "/extracurricular-activities",
            icon: <Activity />,
        },
        {
            text: "Fees details",
            link: "/fees",
            icon: <DollarSign />,
        },
        {
            text: "Grade details",
            link: "/grades",
            icon: <BarChart />,
        },
        {
            text: "Lessions",
            link: "/lessions",
            icon: <BookOpen />,
        },
        {
            text: "Parents",
            link: "/parents",
            icon: <Users />,
        },
        {
            text: "Results",
            link: "/results",
            icon: <Award />,
        },
        {
            text: "Students",
            link: "/students",
            icon: <User />,
        },
        {
            text: "Subjects",
            link: "/subjects",
            icon: <ClipboardList />,
        },
        {
            text: "Teachers",
            link: "/teachers",
            icon: <Users />,
        },
        {
            text: "Transportations",
            link: "/transportations",
            icon: <Bus />,
        },
    ];
    return (
        <div className="bg-secondary  flex flex-col gap-1 p-2 px-5">
            <div className="w-fit px-2 md:w-full md:px-5 py-3 text-xl font-bold text-primary flex justify-center items-center gap-2">
                <LayoutDashboard />
                <span className="hidden md:inline">Staff Dashboard</span>
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
                                            : "hover:bg-primary hover:text-white"
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
