import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Pencil } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditAttendanceList = ({ classId, setSlassLists }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    useEffect(() => {
        const getAttendance = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    BASE_URL + "/attendances/class-attendance/" + classId._id,
                );
                console.log(res?.data?.data?.attendance[0].students);
                const initialStudents = res?.data?.data?.attendance[0].students.map((student) => ({
                    regno: student.studentId.regno, // Student's registration number
                    _id: student.studentId._id, // Student's unique ID
                    name: student.studentId.name, // Student's name
                    present: student.attendance ? "true" : "false", // Set present based on attendance
                }));
                setStudents(initialStudents);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getAttendance();
    }, [dialogOpen, classId]);

    const handleSubmit = async () => {
        console.log({ classId: classId._id, students: students });

        setLoading(true);
        try {
            const res = await axios.post(
                BASE_URL + "/attendances/create-attendance/",
                { classId: classId._id, students: students },
                {
                    headers: { token: token },
                },
            );
            console.log(res?.data?.data?.attendance?._id);

            // Properly updating the array immutably
            setSlassLists((prev) => {
                return prev.map((val) => {
                    if (val._id === classId._id) {
                        // Return a new object with the updated attendanceId
                        return {
                            ...val,
                            attendanceId: res?.data?.data?.attendance?._id,
                        };
                    }
                    // If classId doesn't match, return the original object
                    return val;
                });
            });

            setDialogOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);

            toast({
                variant: "destructive",
                title: error?.response?.data?.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        console.log({ classId: classId._id, students: students });

        setLoading(true);
        try {
            const res = await axios.put(
                BASE_URL + "/attendances/edit-attendance/" + classId.attendanceId,
                { classId: classId._id, students: students },
                {
                    headers: { token: token },
                },
            );
            console.log(res?.data?.data?.attendance?._id);

            // Properly updating the array immutably
            setSlassLists((prev) => {
                return prev.map((val) => {
                    if (val._id === classId._id) {
                        // Return a new object with the updated attendanceId
                        return {
                            ...val,
                            attendanceId: res?.data?.data?.attendance?._id,
                        };
                    }
                    // If classId doesn't match, return the original object
                    return val;
                });
            });

            setDialogOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);

            toast({
                variant: "destructive",
                title: error?.response?.data?.message,
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center gap-1">
                    {classId?.attendanceId ? (
                        <>
                            <Edit size={18} />
                            Edit
                        </>
                    ) : (
                        <>
                            <Pencil size={18} />
                            Add attendance
                        </>
                    )}
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Attendance</DialogTitle>
                </DialogHeader>
                <table className="w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <td colSpan={3} className="my-5">
                                <Input className="w-full" placeholder="Type here to search" />
                            </td>
                        </tr>
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Reg no</th>
                            <th className="p-2">Present</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr
                                key={student.regno}
                                className="text-center odd:bg-gray-200 bg-gray-50 rounded-md overflow-hidden"
                            >
                                <td className="p-3">{student.name}</td>
                                <td className="p-3">{student.regno}</td>
                                <td className="p-3">
                                    <Select
                                        onValueChange={(e) => {
                                            setStudents((prev) =>
                                                prev.map((val) =>
                                                    val.regno === student.regno
                                                        ? {
                                                              ...val,
                                                              present:
                                                                  e === "true" ? "true" : "false",
                                                          }
                                                        : val,
                                                ),
                                            );
                                        }}
                                        value={student.present.toString()}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Present" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">Present</SelectItem>
                                            <SelectItem value="false">Absent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <DialogFooter className="sm:justify-end">
                    {classId?.attendanceId ? (
                        <Button onClick={handleEdit} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditAttendanceList;
