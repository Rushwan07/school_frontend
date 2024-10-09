import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PenBox, Plus } from "lucide-react";
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

// import { DatePickerWithRange } from "./DateRangePicker";
// import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/DatePicker";
import { Label } from "@/components/ui/label";

const EditActivity = ({ classes }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [classId, setClassId] = useState("");
    const [fees, setFees] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async () => {
        console.log({ name, description, classId, date, fees });

        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setDialogOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {" "}
            <DialogTrigger>
                <Button
                    size={"icon"}
                    variant={"outline"}
                    // onClick={() => setData(item)}
                >
                    <PenBox />
                </Button>
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
                        <SelectItem value=" ">Select all</SelectItem>
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

export default EditActivity;
