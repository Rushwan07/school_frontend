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

import { Plus } from "lucide-react";
import { DatePicker } from "@/components/DatePicker";
import Multiselect from "multiselect-react-dropdown";

const TeacherForm = ({ onSubmit, loading }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [date, setDate] = useState();
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    const subjects = [
        { id: 1, name: "Mathematics" },
        { id: 2, name: "Science" },
        { id: 3, name: "History" },
        { id: 4, name: "Geography" },
        { id: 5, name: "English" },
        { id: 6, name: "Physical Education" },
    ];

    const classes = [
        { id: 1, name: "class one" },
        { id: 2, name: "class two" },
        { id: 3, name: "class three" },
        { id: 4, name: "class four" },
        { id: 5, name: "class fine" },
        { id: 6, name: "class six " },
    ];

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
        setTeacherData((prev) => ({ ...prev, img: e.target.files[0] }));
    };

    const handleSubmit = () => {
        console.log(teacherData);
        console.log(date);
        console.log(selectedSubjects);
        console.log(selectedClasses);

        // onSubmit(teacherData);
    };

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
                    <div>
                        <div>
                            <Label>Subjects</Label>
                            <Multiselect
                                options={subjects} // Options to display in the dropdown
                                selectedValues={selectedSubjects} // Preselected value to persist in dropdown
                                onSelect={(selectedList) => setSelectedSubjects(selectedList)} // Function will trigger on select event
                                onRemove={(selectedList) => setSelectedSubjects(selectedList)} // Function will trigger on remove event
                                displayValue="name" // Property to display in the dropdown
                                className="rounded-lg"
                                placeholder="Select Subjects"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Classes</Label>
                        {/* <Input
                            name="classes"
                            type="text"
                            value={teacherData.classes}
                            onChange={handleInputChange}
                           
                        /> */}
                        <Multiselect
                            options={classes}
                            placeholder="Select classes"
                            selectedValues={selectedClasses}
                            onSelect={(selectedList) => setSelectedClasses(selectedList)}
                            onRemove={(selectedList) => setSelectedClasses(selectedList)}
                            displayValue="name"
                            className="rounded-lg"
                        />
                    </div>
                    <div>
                        <Label>Birthday</Label>
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
