import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateClassCard = ({ setSlassLists }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [name, setName] = useState("");
    const [fees, setFees] = useState(0);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [teacher, setTeacher] = useState([]); // Ensure it's an array
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    useEffect(() => {
        const getClass = async () => {
            setLoading(true); // Set loading before fetching data
            try {
                const teacherRes = await axios.get(`${BASE_URL}/teachers/all-teacher`, {
                    withCredentials: true,
                });
                const studentRes = await axios.get(`${BASE_URL}/students/all-students`, {
                    withCredentials: true,
                });
                const subjectRes = await axios.get(`${BASE_URL}/subjects`, {
                    withCredentials: true,
                });

                setTeacher(teacherRes.data.data.teachers || []); // Ensure default to empty array
                setStudents(studentRes.data.data.students || []); // Ensure default to empty array
                setSubjects(subjectRes.data.data.subjects || []); // Ensure default to empty array
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: error?.response?.data?.message || "Uh oh! Something went wrong.",
                });
            } finally {
                setLoading(false);
            }
        };
        getClass();
    }, []);

    // const handleSubmit = async () => {
    //     setLoading(true);
    //     try {
    //         console.log("Selected Staff:", selectedStaff);
    //         console.log("Capacity:", capacity);
    //         console.log("Class Name:", name);
    //         console.log("Selected Subjects:", selectedSubjects);
    //         console.log("Fees:", fees);
    //         console.log("Selected Students:", selectedStudents);
    //         await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay
    //         setDialogOpen(false);
    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Assuming selectedSubjects and selectedStudents are arrays
            const subjectsId = selectedSubjects.map((subject) => subject._id); // Collecting subject IDs
            const studentsId = selectedStudents.map((student) => student._id); // Collecting student IDs
            const res = await axios.post(
                `${BASE_URL}/classes`,
                {
                    teacherId: selectedStaff, // Assuming selectedStaff is a string with the staff ID
                    subjectsId, // This will be an array of subject IDs
                    studentsId: studentsId, // This will be an array of student IDs
                    name,
                    baseFees: fees,
                    capacity,
                },
                {
                    headers: { token: token },
                },
            );

            console.log(res?.data?.data?.class);
            setSlassLists((prev) => [...prev, res?.data?.data?.class]);
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

    const handleSelectChange = (value) => {
        setSelectedStaff(value);
    };

    const filteredStudents = students.filter((student) =>
        student.regNo?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center gap-1">
                    <Plus size={18} />
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Class</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                    <div>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Capacity</Label>
                        <Input
                            type="number"
                            placeholder="Capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Subjects</Label>
                        <Multiselect
                            options={subjects}
                            selectedValues={selectedSubjects}
                            onSelect={(selectedList) => setSelectedSubjects(selectedList)}
                            onRemove={(selectedList) => setSelectedSubjects(selectedList)}
                            displayValue="name"
                            className="rounded-lg"
                        />
                    </div>
                    <div>
                        <Label>Students</Label>
                        <input
                            type="text"
                            placeholder="Search by Registration No"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-2 rounded-lg border p-2 mx-3"
                        />
                        <Multiselect
                            options={students}
                            selectedValues={selectedStudents}
                            onSelect={(selectedList) => setSelectedStudents(selectedList)}
                            onRemove={(selectedList) => setSelectedStudents(selectedList)}
                            displayValue="regno"
                            className="rounded-lg"
                        />
                    </div>
                    <div>
                        <Label>Staff</Label>
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select Staff" />
                            </SelectTrigger>
                            <SelectContent>
                                {teacher.map((staff) => (
                                    <SelectItem key={staff._id} value={staff._id?.toString()}>
                                        {staff.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Fees</Label>
                        <Input
                            type="number"
                            placeholder="Fees"
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateClassCard;
