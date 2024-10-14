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
import CreateSubject from "./CreateSubject";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateClassCard = ({ setSlassLists }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [name, setName] = useState("");
    const [fees, setFees] = useState(0);
    const [screen, setScreen] = useState(0);

    const [teacher, setTeacher] = useState([]); // Ensure it's an array
    const [subjects, setSubjects] = useState([]);

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

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const subjectsId = selectedSubjects.map((subject) => subject._id);

            const res = await axios.post(
                `${BASE_URL}/classes`,
                {
                    teacherId: selectedStaff,
                    subjectsId,
                    studentsId: [],
                    name,
                    baseFees: fees,
                    capacity,
                    subjects,
                },
                {
                    headers: { token: token },
                },
            );

            setSlassLists((prev) => [...prev, res?.data?.data?.class]);
            setSelectedSubjects([]);
            setSelectedStaff([]);
            setCapacity("");
            setName("");
            setFees("");
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

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center gap-1">
                    <Plus size={18} />
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                {screen == 0 ? (
                    <>
                        {" "}
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
                            {/* <div>
                        <Label>Subjects</Label>
                        <Multiselect
                            options={subjects}
                            selectedValues={selectedSubjects}
                            onSelect={(selectedList) => setSelectedSubjects(selectedList)}
                            onRemove={(selectedList) => setSelectedSubjects(selectedList)}
                            displayValue="name"
                            className="rounded-lg"
                        />
                    </div> */}

                            <div>
                                <Label>Staff</Label>
                                <Select onValueChange={handleSelectChange}>
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue placeholder="Select Staff" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teacher.map((staff) => (
                                            <SelectItem
                                                key={staff._id}
                                                value={staff._id?.toString()}
                                            >
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
                    </>
                ) : (
                    <CreateSubject
                        setSubjects={setSubjects}
                        subjects={subjects}
                        teacher={teacher}
                    />
                )}
                <DialogFooter className="sm:justify-end">
                    <Button onClick={() => setScreen((prev) => (prev == 1 ? 0 : 1))}>
                        {screen === 0 ? "Next" : "Previous"}
                    </Button>
                    {screen == 1 && (
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateClassCard;
