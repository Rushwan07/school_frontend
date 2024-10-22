import { useEffect, useState } from "react";
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

import { Plus } from "lucide-react";
import { DatePicker } from "./DobCalendar";

import axios from "axios";
import useFirebaseUpload from "@/hooks/use-firebaseUploads";
import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const TeacherForm = ({ setTeachers }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [date, setDate] = useState();

    const [file, setFile] = useState(null);

    const [teacherData, setTeacherData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        img: "",
        bloodType: "",
        sex: "",

        classes: "",
        birthday: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeacherData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setLoading(true);
        setFile(e.target.files[0]);
    };

    const { progress, error, downloadURL } = useFirebaseUpload(file);

    useEffect(() => {
        if (downloadURL) {
            setTeacherData((prev) => ({ ...prev, img: downloadURL }));
            setLoading(false);
        }
    }, [downloadURL]);

    const handleSubmit = async () => {
        console.log(teacherData);
        try {
            setLoading(true);
            const res = await axios.post(BASE_URL + "/teachers", {
                ...teacherData,
                birthday: date,
                subjects: [],
                classes: [],
                //subjects: selectedSubjects?.map((subj) => subj._id),
                //classes: selectedClasses?.map((cls) => cls._id),
            });
            setTeacherData({
                username: "",
                password: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                img: "",
                bloodType: "",
                sex: "",

                classes: "",
                birthday: "",
            });
            setTeachers((prev) => [...prev, res?.data?.data?.teacher]);
            setDialogOpen(false);
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
        }
    };

    useEffect(() => {
        const getSubjectsAndClasses = async () => {
            try {
                const res = await axios.get(BASE_URL + "/subjects");
                console.log(res?.data?.data?.subjects);
                const ress = await axios.get(BASE_URL + "/classes");
            } catch (error) {
                console.log(error);
            }
        };
        getSubjectsAndClasses();
    }, []);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Staff/Teacher Details</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Username</Label>
                        <Input
                            name="username"
                            type="text"
                            value={teacherData.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            name="password"
                            type="password"
                            value={teacherData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                        />
                    </div>
                    <div>
                        <Label>Name</Label>
                        <Input
                            name="name"
                            type="text"
                            value={teacherData.name}
                            onChange={handleInputChange}
                            placeholder="Enter full name"
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            name="email"
                            type="email"
                            value={teacherData.email}
                            onChange={handleInputChange}
                            placeholder="Enter email address"
                        />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input
                            name="phone"
                            type="text"
                            value={teacherData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input
                            name="address"
                            type="text"
                            value={teacherData.address}
                            onChange={handleInputChange}
                            placeholder="Enter address"
                        />
                    </div>
                    <div>
                        <Label>Blood Type</Label>
                        <Input
                            name="bloodType"
                            type="text"
                            value={teacherData.bloodType}
                            onChange={handleInputChange}
                            placeholder="Enter blood type"
                        />
                    </div>
                    <div>
                        <Label>Sex</Label>
                        <Select
                            name="sex"
                            value={teacherData.sex}
                            onValueChange={(value) =>
                                setTeacherData((prev) => ({ ...prev, sex: value }))
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
                    {/* <div>
                        <div>
                            <Label>Subjects</Label>
                            <Multiselect
                                options={subjects}
                                selectedValues={selectedSubjects}
                                onSelect={(selectedList) => setSelectedSubjects(selectedList)}
                                onRemove={(selectedList) => setSelectedSubjects(selectedList)}
                                displayValue="name"
                                className="rounded-lg"
                                placeholder="Select Subjects"
                            />
                        </div>
                    </div> */}
                    {/* <div>
                        <Label>Classes</Label> */}
                    {/* <Input
                            name="classes"
                            type="text"
                            value={teacherData.classes}
                            onChange={handleInputChange}
                           
                        /> */}
                    {/* <Multiselect
                            options={classes}
                            placeholder="Select classes"
                            selectedValues={selectedClasses}
                            onSelect={(selectedList) => setSelectedClasses(selectedList)}
                            onRemove={(selectedList) => setSelectedClasses(selectedList)}
                            displayValue="name"
                            className="rounded-lg"
                        /> 
                    </div>*/}
                    <div>
                        <Label>Birthday</Label>
                        {/* <DatePicker name="birthday" date={date} setDate={setDate} /> */}
                        <DatePicker name="birthday" date={date} setDate={setDate} />
                    </div>
                    <div>
                        <Label>Image</Label>

                        <Input name="img" type="file" onChange={handleFileChange} />
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Submit"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TeacherForm;
