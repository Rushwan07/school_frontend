import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StudentList = ({ classId }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([
        {
            _id: "adfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "aasdfadfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "adasdfafs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "arewrdfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "adfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "aasdfadfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "adasdfafs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "arewrdfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "adfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "aasdfadfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "adasdfafs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
        {
            _id: "arewrdfs",
            regNo: "123",
            name: "student 1",
            present: true,
        },
    ]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setDialogOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center gap-1">
                    <Pencil size={18} />
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                <table className="w-full border-separate border-spacing-y-3">
                    {" "}
                    {/* Adds vertical spacing */}
                    <thead>
                        {" "}
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
                        {students?.map((student) => (
                            <tr
                                key={student?.regNo}
                                className="text-center odd:bg-gray-200 bg-gray-50 rounded-md overflow-hidden"
                            >
                                <td className="p-3">{student?.name}</td>
                                <td className="p-3">{student?.regNo}</td>
                                <td className="p-3">
                                    <Select>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Present" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true" default>
                                                Present
                                            </SelectItem>
                                            <SelectItem value="false">Absent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>{" "}
                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>{" "}
        </Dialog>
    );
};

export default StudentList;
