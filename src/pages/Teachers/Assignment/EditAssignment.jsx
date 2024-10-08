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

import { DatePickerWithRange } from "./DateRangePicker";
import { Label } from "@/components/ui/label";

const EditAssignment = ({ item }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [subjects, setSubjects] = useState([
        {
            _id: "abcd",
            name: "Maths",
        },
        {
            _id: "abcd2",
            name: "Maths",
        },
        {
            _id: "abcddfd",
            name: "Maths",
        },
    ]);

    const [classes, setClasses] = useState([
        {
            _id: "sadfasdf",
            name: "first class",
        },
        {
            _id: "s3432adfasdf",
            name: "first class",
        },
        {
            _id: "sadfasdfasd",
            name: "first class",
        },
        {
            _id: "sadfaasdfasdf",
            name: "first class",
        },
    ]);

    const [data, setData] = useState({
        subjectId: "",
        description: "",
        classId: "",
        startDate: "",
        dueDate: "",
    });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            console.log(data);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setDialogOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    console.log(item);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {" "}
            <DialogTrigger>
                <Button size={"icon"} variant={"outline"} onClick={() => setData(item)}>
                    <PenBox />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Assignment</DialogTitle>
                </DialogHeader>
                <Label>Class</Label>
                <Select
                    value={data.classId}
                    onValue
                    onValueChange={(e) => setData((prev) => ({ ...prev, classId: e }))}
                >
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
                </Select>
                <Label>Subject </Label>
                <Select
                    value={data.subjectId}
                    onValue
                    onValueChange={(e) => setData((prev) => ({ ...prev, subjectId: e }))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value=" ">Select all</SelectItem>
                        {subjects?.map((value) => (
                            <SelectItem key={value?._id} value={value?._id}>
                                {value?.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>{" "}
                <Label>Title</Label>
                <Input
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                />
                <Label>Description</Label>
                <Textarea
                    placeholder="Enter description here"
                    rows="5"
                    value={data.description}
                    onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                />
                <Label>Date</Label>
                <DatePickerWithRange setData={setData} />
                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditAssignment;
