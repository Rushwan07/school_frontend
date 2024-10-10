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

// import { DatePickerWithRange } from "./DateRangePicker";
// import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "./ExamDatePicker";
import { Label } from "@/components/ui/label";

//Once admin selects a class get subjects from database and show it to the admin
const CreateAssignment = ({ classes, subjects }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [examName, setExamName] = useState("");
    const [description, setDescription] = useState("");
    const [classId, setClassId] = useState("");

    const [subjectDates, setSubjectDates] = useState([]);

    const handleSubmit = async () => {
        console.log(subjectDates);

        return;
        console.log({ examName, description, classId });

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

    // Function to update subject date
    const updateSubjectDate = (subjectId, date) => {
        setSubjectDates((prevDates) => {
            const existingSubject = prevDates.find((item) => item.subjectId === subjectId);
            if (existingSubject) {
                // Update date for existing subject
                return prevDates.map((item) =>
                    item.subjectId === subjectId ? { subjectId, date } : item,
                );
            } else {
                // Add new subject date
                return [...prevDates, { subjectId, date }];
            }
        });
    };
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {" "}
            <DialogTrigger>
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Exam</DialogTitle>
                </DialogHeader>
                <Label>Exam name</Label>
                <Input
                    type="text"
                    placeholder="Event name"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
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
                <Label>Subjects</Label>
                {subjects?.map((subject) => (
                    <div key={subject?._id} className="flex justify-between px-2 mb-4">
                        <span className="flex-1">{subject?.name}</span>
                        <span className="flex-1">
                            <DatePicker
                                subjectId={subject?._id}
                                setDate={(date) => {}}
                                updateSubjectDate={updateSubjectDate}
                            />
                        </span>
                    </div>
                ))}
                {/* <Select value={subject} onValue onValueChange={(e) => setSubject(e)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value=" ">Select all</SelectItem>
                        {subjects?.map((value) => (
                            <SelectItem key={value?._id} value={value?._id}>
                                {value?.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
                {/* <Input
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                /> */}
                {/* <Label>Date</Label>
                <DatePicker date={date} setDate={setDate} /> */}
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
