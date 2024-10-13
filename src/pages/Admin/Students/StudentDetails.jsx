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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./DobCalendar";
import { Label } from "@/components/ui/label";
import ParentForm from "./ParentForm";
import { Eye, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import TransportationComponent from "./Transportation";

const StudentForm = ({ setStudents, transports, classLists }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [date, setDate] = useState();
    const [parentData, setParentData] = useState({
        name: "", // New field for Parent Name
        email: "",
        phone: "",
        address: "",
    });
    const [studentData, setStudentData] = useState({
        regno: "",
        name: "",
        bloodType: "",
        address: "",
        img: null,
        sex: "",
        classId: "",
        birthday: "",
        transportation: {
            pickupLocation: "",
            dropOffLocation: "",
            busNumber: "",
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setStudentData((prev) => ({ ...prev, img: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        console.log(studentData);
        console.log(date);
        console.log(parentData);

        try {
            const res = await axios.post(BASE_URL + "/students", {
                student: {
                    ...studentData,
                    birthday: date,
                    transportation: undefined,
                },
                parent: parentData,
                transport: studentData.transportation,
            });
            console.log(res?.data?.data);
            setStudents((prev) => [...prev, res?.data?.data?.student]);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message)
                toast({
                    variant: "destructive",
                    title: error?.response?.data?.message,
                });
            else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } finally {
            setLoading(false);
            setDialogOpen(false);
        }
    };
    //data should send in this format
    // {
    //     "student":{
    //          "regno": "101",
    //          "name": "student",
    //          "address": "123 Main Street, Anytown, USA",
    //          "img": "https://example.com/student.jpg",
    //          "bloodType": "A+",
    //          "sex": "MALE",
    //          "classId": "6704ec91fee39a5e6ebd0162",
    //          "birthday": "2024-10-04"
    //      },
    //      "parent":{
    //          "address":"address for the parent",
    //          "email":"parent@gmail.com",
    //          "name":"test parent",
    //          "phone": "8973927483"
    //      },
    //      "transport":{
    //          "pickupLocation":"",
    //          "dropOffLocation":"",
    //          "busId":"",
    //          "fees":500
    //      }
    //    }
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Student Details</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Registration Number</Label>
                        <Input
                            name="regno"
                            type="text"
                            value={studentData.regno}
                            onChange={handleInputChange}
                            placeholder="Enter registration number"
                        />
                    </div>
                    <div>
                        <Label>Name</Label>
                        <Input
                            name="name"
                            type="text"
                            value={studentData.name}
                            onChange={handleInputChange}
                            placeholder="Enter student name"
                        />
                    </div>
                    <div>
                        <Label>Blood Type</Label>
                        <Input
                            name="bloodType"
                            type="text"
                            value={studentData.bloodType}
                            onChange={handleInputChange}
                            placeholder="Enter blood type"
                        />
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input
                            name="address"
                            type="text"
                            value={studentData.address}
                            onChange={handleInputChange}
                            placeholder="Enter address"
                        />
                    </div>
                    <div>
                        <Label>Sex</Label>
                        <Select
                            name="sex"
                            value={studentData.sex}
                            onValueChange={(value) =>
                                setStudentData((prev) => ({ ...prev, sex: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Class</Label>

                        <Select
                            name="classId"
                            value={studentData.classId}
                            onValueChange={(value) =>
                                setStudentData((prev) => ({ ...prev, classId: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                                {classLists?.map((classItem) => (
                                    <SelectItem key={classItem._id} value={classItem._id}>
                                        {classItem?.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Birthday</Label>
                        <DatePicker name="birthday" type="date" date={date} setDate={setDate} />
                    </div>
                    <div>
                        <Label>Image</Label>
                        <Input name="img" type="file" onChange={handleFileChange} />
                    </div>
                </div>

                <TransportationComponent
                    setStudentData={setStudentData}
                    studentData={studentData}
                    transports={transports}
                />
                <ParentForm parentData={parentData} setParentData={setParentData} />
                <div className="mt-4 flex justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Submit"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StudentForm;
