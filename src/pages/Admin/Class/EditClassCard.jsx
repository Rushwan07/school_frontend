import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
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
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import EditSubjects from "./EditSubject";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditClassCard = ({ item, setSlassLists }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [name, setName] = useState("");
    const [fees, setFees] = useState(0);
    const [screen, setScreen] = useState(0);
    const [teacher, setTeacher] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const { token } = useSelector((state) => state?.user || {});

    useEffect(() => {
        console.log("item : ");
        console.log(item.subjectsId);
        if (dialogOpen && item) {
            setName(item.name);
            setCapacity(item.capacity);
            setSelectedStaff(item.teacherId?._id);
            setFees(item.baseFees);
            setSelectedSubjects(item.subjectsId || []);
            setSubjects(item?.subjectsId || []);
        }
    }, [dialogOpen, item]);

    // Fetch teachers for the staff dropdown
    useEffect(() => {
        const getTeachers = async () => {
            try {
                const teacherRes = await axios.get(`${BASE_URL}/teachers/all-teacher`, {
                    withCredentials: true,
                });
                setTeacher(teacherRes.data.data.teachers || []);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: error?.response?.data?.message || "Something went wrong.",
                });
            }
        };
        getTeachers();
    }, []);

    const handleEdit = async () => {
        setLoading(true);
        try {
            // const subjectsId = selectedSubjects.map((subject) => subject);
            console.log({
                selectedSubjects,
                teacherId: selectedStaff,
                subjectsId: selectedSubjects,
                studentsId: [],
                name,
                baseFees: fees,
                capacity,
            });

            const res = await axios.put(
                `${BASE_URL}/classes/${item._id}`,
                {
                    teacherId: selectedStaff,
                    subjectsId: selectedSubjects,
                    studentsId: [],
                    name,
                    baseFees: fees,
                    capacity,
                },
                {
                    headers: { token: token },
                },
            );
            console.log(res);
            // Update the class in the class list
            setSlassLists((prev) =>
                prev.map((cls) => (cls._id === item._id ? res?.data?.data?.class : cls)),
            );

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
                    <Edit size={18} /> Edit
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                {screen === 0 ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Edit Class</DialogTitle>
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
                                <Label>Incharge staff</Label>
                                <Select onValueChange={handleSelectChange} value={selectedStaff}>
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
                    <EditSubjects
                        setSubjects={setSelectedSubjects}
                        subjects={selectedSubjects}
                        teacher={teacher}
                    />
                )}
                <DialogFooter className="sm:justify-end">
                    <Button onClick={() => setScreen((prev) => (prev === 1 ? 0 : 1))}>
                        {screen === 0 ? "Next" : "Previous"}
                    </Button>
                    {screen === 1 && (
                        <Button onClick={handleEdit} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditClassCard;
