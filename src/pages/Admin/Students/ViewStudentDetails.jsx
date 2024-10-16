import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import ParentForm from "./ParentForm";
import { Eye } from "lucide-react";

const ViewStudentDetails = ({ item }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    console.log(item);
    const parentData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        address: "123 Street, City",
    };

    const studentData = {
        regno: "001",
        name: "Jane Doe",
        bloodType: "O+",
        address: "456 Street, City",
        sex: "Female",
        classId: "Class 10",
        birthday: "2005-05-05",
        transportation: {
            pickupLocation: "Pickup Point A",
            dropOffLocation: "Drop Point B",
            busNumber: "Bus 12",
        },
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center">
                    <Eye size={20} /> &nbsp; View
                </button>
            </DialogTrigger>
            <DialogContent className=" max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Details Overview</DialogTitle>
                </DialogHeader>

                {/* Student Details Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Student Details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="font-semibold">Reg No:</p>
                            <p>{item.regno || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Name:</p>
                            <p>{item.name || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Blood Type:</p>
                            <p>{item.bloodType || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Address:</p>
                            <p>{item.address || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Sex:</p>
                            <p>{item.sex || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Class:</p>
                            <p>{item.classId?.name || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Birthday:</p>
                            <p>{new Date(item.birthday).toLocaleDateString() || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Parent Details Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Parent Details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="font-semibold">Name:</p>
                            <p>{item?.parentId?.name || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Email:</p>
                            <p>{item?.parentId?.email || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Phone:</p>
                            <p>{item?.parentId?.phone || "N/A"}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Address:</p>
                            <p>{item?.parentId?.address || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Transportation Details Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Transportation Details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="font-semibold">Pickup Location:</p>
                            <p>{item.transportations?.pickupLocation || "N/A"}</p>
                        </div>

                        <div className="flex justify-between">
                            <p className="font-semibold">Bus Number:</p>
                            <p>{studentData.transportations?.busNumber || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Dialog Footer with Close Button */}
                <div className="mt-4 flex justify-end">
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewStudentDetails;
