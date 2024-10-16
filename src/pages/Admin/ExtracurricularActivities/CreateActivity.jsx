import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// import { DatePickerWithRange } from "./DateRangePicker";
// import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/DatePicker";
import { Label } from "@/components/ui/label";
import axios from "axios";

const CreateAssignment = ({ classes, setActivities }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [classId, setClassId] = useState("--");
    const [fees, setFees] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async () => {
        console.log({ name, description, classId, date, fees });
        setLoading(true);
        try {
            const res = await axios.post(BASE_URL + "/activitys", {
                name,
                description,
                classId,
                duedate: date,
                fees,
            });
            console.log(res?.data?.data?.extraCurricularActivity);
            setActivities((prev) => [...prev, res?.data?.data?.extraCurricularActivity]);
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

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {" "}
            <DialogTrigger>
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Activity</DialogTitle>
                </DialogHeader>
                <Label>Activity name</Label>
                <Input
                    type="text"
                    placeholder="Activity  name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label>Description</Label>
                <Textarea
                    placeholder="Enter description here"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Label>Class</Label>
                <Select value={classId} onValue onValueChange={(e) => setClassId(e)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="--">Select all</SelectItem>
                        {classes?.map((value) => (
                            <SelectItem key={value?._id} value={value?._id}>
                                {value?.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>{" "}
                <Label>Fees</Label>
                <Input
                    placeholder="Fees"
                    type="number"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                />
                <Label>Due Date</Label>
                <DatePicker date={date} setDate={setDate} />
                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAssignment;
