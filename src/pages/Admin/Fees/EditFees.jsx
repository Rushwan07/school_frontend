import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditFees = ({ fees, setFees }) => {
    const { token } = useSelector((state) => state.user.user || {});

    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [studentId, setStudentId] = useState("");
    const [classId, setClassId] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState({
        fees: fees?.fees || [{ name: "", fee: 0 }],
        date: fees?.date || "",
    });
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const getClasses = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/classes`, {
                    headers: { token },
                });
                setClasses(res?.data?.data?.class || []);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: error?.response?.data?.message || "Uh oh! Something went wrong.",
                });
            }
        };
        getClasses();
    }, [token]);

    const handleClassChange = (e) => {
        const selectedClassId = e.target.value;
        setClassId(selectedClassId);
        const selectedClass = classes.find((cls) => cls._id === selectedClassId);
        if (selectedClass) {
            setStudents(selectedClass.studentsId); // Assuming studentsId is an array
            setStudentId(""); // Reset student selection
        }
    };

    const handleFeesChange = (index, field, value) => {
        const newFees = [...data.fees];
        newFees[index][field] = value;
        setData({ ...data, fees: newFees });
    };

    const addFee = () => {
        setData((prev) => ({
            ...prev,
            fees: [...prev.fees, { name: "", fee: 0 }],
        }));
    };

    const removeFee = (index) => {
        const newFees = data.fees.filter((_, i) => i !== index);
        setData({ ...data, fees: newFees });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.put(`${BASE_URL}/fees/edit/${fees._id}`, {
                fees: data.fees,
                date: data.date,
            });

            console.log(res?.data?.data?.feesDetails);
            setFees(res?.data?.data?.feesDetails);

            console.log("error");

            toast({
                variant: "success",
                title: "Fee record updated successfully!",
            });
            resetForm();
        } catch (error) {
            toast({
                variant: "destructive",
                title: error?.response?.data?.message || "Uh oh! Something went wrong.",
            });
        } finally {
            setLoading(false);
            setDialogOpen(false);
        }
    };

    const resetForm = () => {
        setStudentId("");
        setClassId("");
        setData({ fees: [{ name: "", fee: 0 }], date: "" });
        setStudents([]); // Clear students when resetting the form
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <Button onClick={() => setDialogOpen(true)}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Fee Record</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                    <div>
                        <Label>Class: {fees.classId?.name}</Label>
                    </div>
                    <div>
                        <Label>Student: {fees.studentId?.regno}</Label>
                    </div>
                    <div>
                        <Label>Fees</Label>
                        {data.fees.map((fee, index) => (
                            <div key={index} className="flex space-x-2 items-center mb-2">
                                <Input
                                    type="text"
                                    placeholder="Fee Name"
                                    value={fee.name}
                                    onChange={(e) =>
                                        handleFeesChange(index, "name", e.target.value)
                                    }
                                />
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    value={fee.fee}
                                    onChange={(e) => handleFeesChange(index, "fee", e.target.value)}
                                />
                                <Button variant="destructive" onClick={() => removeFee(index)}>
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
                        <Input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData({ ...data, date: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditFees;
