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

const TeacherSidebar = () => {
    const links = [
        {
            text: "Profile",
            link: "/staffs/profile",
            icon: <Home />,
        },
        {
            text: "Anouncements",
            link: "/staffs/anouncement",
            icon: <MicVocal />,
        },
        {
            text: "Assignments",
            link: "/staffs/assignment",
            icon: <ClipboardList />,
        },
        {
            text: "Attendance",
            link: "/staffs/attendance", // Corrected from 'attendences' to 'attendance'
            icon: <CheckSquare />,
        },
        {
            text: "Class",
            link: "/staffs/class", // Corrected from 'classes' to 'class'
            icon: <Calendar />,
        },
        {
            text: "Events",
            link: "/staffs/events",
            icon: <CalendarDays />,
        },
        {
            text: "Exams",
            link: "/staffs/exams", // Corrected from 'Exams' to 'exams' (lowercase)
            icon: <Clipboard />,
        },
        {
            text: "Extracurricular Activities",
            link: "/staffs/extracurricular-activities",
            icon: <Activity />,
        },
        {
            text: "Lessons",
            link: "/staffs/lessons", // Corrected from 'lessions' to 'lessons'
            icon: <BookOpen />,
        },
        {
            text: "Parents",
            link: "/staffs/parents",
            icon: <Users />,
        },
        {
            text: "Results",
            link: "/staffs/results",
            icon: <Award />,
        },
        {
            text: "Students",
            link: "/staffs/students",
            icon: <User />,
        },
        {
            text: "Subjects",
            link: "/staffs/subjects",
            icon: <ClipboardList />,
        },
        {
            text: "Transportations",
            link: "/staffs/transportations",
            icon: <Bus />,
        },
    ];

    return (
        <div className="bg-secondary  flex flex-col gap-1 p-2 px-5">
            <div className="w-fit px-2 md:w-full md:px-5 py-3 text-xl font-bold text-primary  flex gap-2">
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

export default TeacherSidebar;
