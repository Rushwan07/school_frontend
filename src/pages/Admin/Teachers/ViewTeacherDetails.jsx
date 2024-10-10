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

import { Eye } from "lucide-react";

const ViewStudentDetails = ({ onSubmit, loading }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const teacherData = {
        username: "rubi",
        password: "abcd ",
        name: "rrubi rubi",
        email: "rubi@gmail.com",
        phone: "9089878987",
        address: "address of 0988",
        img: "",
        bloodType: "O+",
        sex: "FEMALE",
        classes: "ABCD, Efg,Hig",
        birthday: "",
        subjects: "ADFADSFA",
        classes: "SFASFDA,ASDFASDF",
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Username:</Label>
                        <p>{teacherData?.username || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Password:</Label>
                        <p>{teacherData?.password ? "******" : "N/A"}</p>
                    </div>
                    <div>
                        <Label>Name:</Label>
                        <p>{teacherData?.name || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Email:</Label>
                        <p>{teacherData?.email || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Phone:</Label>
                        <p>{teacherData?.phone || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Address:</Label>
                        <p>{teacherData?.address || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Blood Type:</Label>
                        <p>{teacherData?.bloodType || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Sex:</Label>
                        <p>{teacherData?.sex || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Subjects:</Label>
                        <p>{teacherData?.subjects || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Classes:</Label>
                        <p>{teacherData?.classes || "N/A"}</p>
                    </div>
                    <div>
                        <Label>Birthday:</Label>
                        <p>
                            {teacherData?.birthday
                                ? new Date(teacherData?.birthday).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
                    <div>
                        <Label>Image:</Label>
                        {teacherData?.img ? (
                            <img
                                src={URL.createObjectURL(teacherData?.img)}
                                alt="Teacher Image"
                                className="w-16 h-16 rounded-full"
                            />
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>

                {/* Dialog Footer with Close Button */}
                <div className="mt-4 flex justify-end">
                    <Button onClick={() => setDialogOpen(false)} disabled={loading}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewStudentDetails;
