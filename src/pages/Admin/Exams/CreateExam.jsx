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
import { DatePicker } from "./ExamDatePicker";
import { Label } from "@/components/ui/label";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

//Once admin selects a class get subjects from database and show it to the admin
const CreateAssignment = ({ classes, setExams }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [subjects, setSubjects] = useState([]);
    const [examName, setExamName] = useState("");
    const [description, setDescription] = useState("");
    const [classId, setClassId] = useState("");

    const [subjectDates, setSubjectDates] = useState([]);

    const handleSubmit = async () => {
        console.log(subjectDates);
        console.log({ examName, description, classId });

        setLoading(true);
        try {
            const res = await axios.post(BASE_URL + "/exams", {
                name: examName,
                description,
                classId,
                subjects: subjectDates,
            });
            console.log(res?.data?.data);
            setExams((prev) => [...prev, res?.data?.data?.exam]);
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

    const updateSubjectDate = (subjectId, date) => {
        setSubjectDates((prevDates) => {
            const existingSubject = prevDates.find((item) => item.subjectId === subjectId);
            if (existingSubject) {
                return prevDates.map((item) =>
                    item.subjectId === subjectId ? { subjectId, date } : item,
                );
            } else {
                return [...prevDates, { subjectId, date }];
            }
        });
    };

    useEffect(() => {
        const getData = async () => {
            try {
                if (!classId) return;
                const res = await axios.get(BASE_URL + "/subjects/subject-class/" + classId);
                console.log(res?.data?.data?.subjects);
                setSubjects(res?.data?.data?.subjects);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [classId]);

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
