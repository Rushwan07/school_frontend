import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

const CreateFees = ({ setFees }) => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [studentId, setStudentId] = useState("");
    const [classId, setClassId] = useState("");
    const [fees, setFeesData] = useState([{ name: "", fee: 0 }]);
    const [date, setDate] = useState("");

    // States for dropdowns
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const getClasses = async () => {
            try {
                const res = await axios.get(BASE_URL + "/classes", {
                    headers: { token: token },
                });
                setClasses(res?.data?.data?.class || []);
            } catch (error) {
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
            }
        };
        getClasses();
    }, [token]);

    const handleClassChange = (e) => {
        const selectedClassId = e.target.value;
        setClassId(selectedClassId);
        const selectedClass = classes.find((cls) => cls._id === selectedClassId);
        if (selectedClass) {
            setStudents(selectedClass.studentsId); // Set students from the selected class
            setStudentId(""); // Reset student selection
        }
    };

    const handleFeesChange = (index, e) => {
        const newFees = [...fees];
        newFees[index][e.target.name] = e.target.value;
        setFeesData(newFees);
    };

    const addFee = () => {
        setFeesData([...fees, { name: "", fee: 0 }]);
    };

    const removeFee = (index) => {
        const newFees = fees.filter((_, i) => i !== index);
        setFeesData(newFees);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/fees/create-fees`, {
                studentId,
                classId,
                fees,
                date,
            });
            setFees((prev) => [...prev, res.data.data.feeRecord]);
            resetForm();
            toast({
                variant: "success",
                title: "Fee record created successfully!",
            });
        } catch (error) {
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

    const resetForm = () => {
        setStudentId("");
        setClassId("");
        setFeesData([{ name: "", fee: 0 }]);
        setDate("");
        setStudents([]); // Clear students when resetting the form
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center gap-1">
                    <Plus size={18} />
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Fee Record</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                    <div>
                        <Label>Class</Label>
                        <select value={classId} onChange={handleClassChange} className="input">
                            <option value="">Select a Class</option>
                            {classes.map((cls) => (
                                <option key={cls._id} value={cls._id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label>Student</Label>
                        <select
                            onChange={(e) => setStudentId(e.target.value)}
                            value={studentId}
                            className="input"
                        >
                            <option value="">Select a Student</option>
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                    {student.regno}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label>Fees</Label>
                        {fees.map((fee, index) => (
                            <div key={index} className="flex space-x-2 items-center">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Fee Name"
                                    value={fee.name}
                                    onChange={(e) => handleFeesChange(index, e)}
                                />
                                <Input
                                    type="number"
                                    name="fee"
                                    placeholder="Amount"
                                    value={fee.fee}
                                    onChange={(e) => handleFeesChange(index, e)}
                                />
                                <Button
                                    onClick={() => removeFee(index)}
                                    variant="destructive"
                                    size="sm"
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button onClick={addFee} className="mt-2">
                            Add Another Fee
                        </Button>
                    </div>
                    <div>
                        <Label>Date</Label>
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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

export default CreateFees;
