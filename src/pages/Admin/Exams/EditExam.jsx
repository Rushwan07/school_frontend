import React, { useCallback, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
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
const EditExams = ({ classes, setExams, item }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [subjects, setSubjects] = useState([]);
    const [examName, setExamName] = useState(item?.name || "");
    const [description, setDescription] = useState(item?.description || "");
    const [classId, setClassId] = useState(item?.classId?._id || "");

    const [subjectDates, setSubjectDates] = useState([]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.put(BASE_URL + "/exams/" + item?._id, {
                name: examName,
                description,
                classId,
                subjects: subjectDates,
            });

            setExams((prev) =>
                prev.map((exam) => (exam._id == item._id ? res?.data?.data?.exam : exam)),
            );

            // setExams((prev) => [...prev, res?.data?.data?.exam]);
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

    const updateSubjectDate = useCallback((subjectId, date) => {
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
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                if (!classId) return;
                const res = await axios.get(BASE_URL + "/subjects/subject-class/" + classId);

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
                <Edit />
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
                {item?.subjects?.map((subject) => (
                    <div key={subject?.subjectId?._id} className="flex justify-between px-2 mb-4">
                        <span className="flex-1">{subject?.subjectId?.name}</span>
                        <span className="flex-1">
                            <DatePicker
                                key={subject?.subjectId?._id}
                                subjectId={subject?.subjectId?._id}
                                setDate={useCallback((date) => {}, [])} // Memoized `setDate`
                                updateSubjectDate={updateSubjectDate}
                                date={subject?.date}
                            />
                        </span>
                    </div>
                ))}
                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditExams;
