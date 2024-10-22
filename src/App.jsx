import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    Home,
    Signin,
    AdminDashboard,
    AdminAnouncement,
    AdminAssignment,
    AdminAttendance,
    AdminClass,
    AdminEvents,
    AdminExams,
    AdminExtracurricularActivities,
    AdminFees,
    AdminLessions,
    AdminParents,
    AdminProfile,
    AdminResults,
    AdminSubjects,
    AdminTeachers,
    AdminTransportations,
    AdminStudents,
    AdminSingleExam,
    AdminGrade,

    // Staff pges
    StaffAnouncement,
    StaffProfile,
    StaffAssignment,
    StaffAttendance,
    StaffEvents,
    StaffExams,
    StaffExtracurricularActivities,
    StaffLessions,
    StaffParents,
    StaffResults,
    StaffStudents,
    StaffSubjects,
    StaffTransportations,
    StaffSingleExamResult,

    // Student pages
    StudentAnouncement,
    StudentProfile,
    StudentAssignment,
    StudentAttendance,
    StudentClass,
    StudentEvents,
    StudentExams,
    StudentExtracurricularActivities,
    StudentLessions,
    StudentFees,
    StudentResults,
    StudentSubjects,
    StudentTransportations,
    StudentCheckout,
} from "@/pages";
import AdminLayout from "./layouts/AdminLayout";
import StaffLayout from "./layouts/StaffLayout";
import StudentLayout from "./layouts/StudentLayout";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/signin",
            element: <Signin />,
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: "dashboard",
                    element: <AdminDashboard />,
                },
                {
                    path: "anouncement",
                    element: <AdminAnouncement />,
                },
                {
                    path: "assignment",
                    element: <AdminAssignment />,
                },
                {
                    path: "attendance",
                    element: <AdminAttendance />,
                },
                {
                    path: "class",
                    element: <AdminClass />,
                },
                {
                    path: "events",
                    element: <AdminEvents />,
                },
                {
                    path: "exams",
                    element: <AdminExams />,
                },
                {
                    path: "results/:classId/:examId",
                    element: <AdminSingleExam />,
                },
                {
                    path: "extracurricular-activities",
                    element: <AdminExtracurricularActivities />,
                },
                {
                    path: "fees",
                    element: <AdminFees />,
                },
                {
                    path: "grade",
                    element: <AdminGrade />,
                },

                {
                    path: "lessons",
                    element: <AdminLessions />,
                },
                {
                    path: "parents",
                    element: <AdminParents />,
                },
                {
                    path: "profile",
                    element: <AdminProfile />,
                },
                {
                    path: "results",
                    element: <AdminResults />,
                },
                {
                    path: "subjects",
                    element: <AdminSubjects />,
                },
                {
                    path: "teachers",
                    element: <AdminTeachers />,
                },
                {
                    path: "transportations",
                    element: <AdminTransportations />,
                },
                {
                    path: "students",
                    element: <AdminStudents />,
                },
            ],
        },
        {
            path: "/staffs",
            element: <StaffLayout />,
            children: [
                // {
                //     path: "dashboard",
                //     element: <AdminDashboard />, // Assuming AdminDashboard is reused for staff dashboard
                // },
                {
                    path: "anouncement",
                    element: <StaffAnouncement />,
                },
                {
                    path: "assignment",
                    element: <StaffAssignment />,
                },
                {
                    path: "attendance",
                    element: <StaffAttendance />,
                },
                // {
                //     path: "class",
                //     element: <StaffClass />,
                // },
                {
                    path: "events",
                    element: <StaffEvents />,
                },
                {
                    path: "exams",
                    element: <StaffExams />,
                },
                {
                    path: "extracurricular-activities",
                    element: <StaffExtracurricularActivities />,
                },
                {
                    path: "lessons",
                    element: <StaffLessions />,
                },
                {
                    path: "parents",
                    element: <StaffParents />,
                },
                {
                    path: "profile",
                    element: <StaffProfile />,
                },
                {
                    path: "results",
                    element: <StaffResults />,
                },
                {
                    path: "students",
                    element: <StaffStudents />,
                },
                {
                    path: "subjects",
                    element: <StaffSubjects />,
                },
                {
                    path: "transportations",
                    element: <StaffTransportations />,
                },
                {
                    path: "results/:classId/:examId",
                    element: <StaffSingleExamResult />,
                },
            ],
        },
        {
            path: "/student",
            element: <StudentLayout />,
            children: [
                {
                    path: "profile",
                    element: <StudentProfile />, // Assuming AdminDashboard is reused for student dashboard
                },
                {
                    path: "anouncement",
                    element: <StudentAnouncement />,
                },
                {
                    path: "assignment",
                    element: <StudentAssignment />,
                },
                {
                    path: "attendance",
                    element: <StudentAttendance />,
                },
                {
                    path: "class",
                    element: <StudentClass />,
                },
                {
                    path: "fees/checkout/:id",
                    element: <StudentCheckout />,
                },
                {
                    path: "events",
                    element: <StudentEvents />,
                },
                {
                    path: "exams",
                    element: <StudentExams />,
                },
                {
                    path: "extracurricular-activities",
                    element: <StudentExtracurricularActivities />,
                },
                {
                    path: "fees",
                    element: <StudentFees />,
                },
                {
                    path: "lessons",
                    element: <StudentLessions />,
                },
                {
                    path: "results",
                    element: <StudentResults />,
                },
                {
                    path: "subjects",
                    element: <StudentSubjects />,
                },
                {
                    path: "transportations",
                    element: <StudentTransportations />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
