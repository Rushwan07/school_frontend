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

const StudentSidebar = () => {
    const links = [
        {
            text: "Profile",
            link: "/student/profile", // Corrected to match the route
            icon: <Home />,
        },
        {
            text: "Anouncements",
            link: "/student/anouncement", // Corrected to match the route
            icon: <MicVocal />,
        },
        {
            text: "Assignments",
            link: "/student/assignment", // Corrected to match the route
            icon: <ClipboardList />,
        },
        {
            text: "Attendance",
            link: "/student/attendance", // Corrected to match the route
            icon: <CheckSquare />,
        },
        // {
        //     text: "Class",
        //     link: "/student/class", // Corrected to match the route
        //     icon: <Calendar />,
        // },
        {
            text: "Events",
            link: "/student/events", // Corrected to match the route
            icon: <CalendarDays />,
        },
        {
            text: "Exams",
            link: "/student/exams", // Corrected from 'Exams' to 'exams' (lowercase)
            icon: <Clipboard />,
        },
        {
            text: "Extracurricular Activities",
            link: "/student/extracurricular-activities", // Corrected to match the route
            icon: <Activity />,
        },
        {
            text: "Accounts",
            link: "/student/fees", // Corrected to match the route
            icon: <DollarSign />,
        },
        // {
        //     text: "Lessions",
        //     link: "/student/lessons", // Corrected from 'lessions' to 'lessons'
        //     icon: <BookOpen />,
        // },
        {
            text: "Results",
            link: "/student/results", // Corrected to match the route
            icon: <Award />,
        },
        {
            text: "Subjects",
            link: "/student/subjects", // Corrected to match the route
            icon: <ClipboardList />,
        },
        {
            text: "Transportations",
            link: "/student/transportations", // Corrected to match the route
            icon: <Bus />,
        },
    ];
    return (
        <div className="bg-secondary  flex flex-col gap-1 p-2 px-5">
            <div className="w-fit px-2 md:w-full md:px-5 py-3 text-xl font-bold text-primary flex justify-center items-center gap-2">
                <LayoutDashboard />
                <span className="hidden md:inline">Student Dashboard</span>
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

export default StudentSidebar;
