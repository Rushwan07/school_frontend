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
import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

import { DatePicker } from "@/components/DatePicker";
import { Label } from "@/components/ui/label";
import axios from "axios";

const EditActivity = ({ classes, setActivities, item }) => {
    console.log(item);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [name, setName] = useState(item?.name || "");
    const [description, setDescription] = useState(item?.description || "");
    const [classId, setClassId] = useState(item?.classId?._id || "--");
    const [fees, setFees] = useState(item?.fees || "");
    const [date, setDate] = useState(item?.duedate || "");

    const handleSubmit = async () => {
        console.log({ name, description, classId, date, fees });
        console.log({ name, description, classId, date, fees });
        setLoading(true);
        try {
            const res = await axios.put(BASE_URL + "/activitys/" + item?._id, {
                name,
                description,
                classId,
                duedate: date,
                fees,
            });

            console.log(res?.data?.data?.extraCurricularActivity);

            setActivities((prev) =>
                prev.map((activity) =>
                    activity._id == item._id ? res?.data?.data?.extraCurricularActivity : activity,
                ),
            );

            // setActivities((prev) => [...prev, res?.data?.data?.extraCurricularActivity]);
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
