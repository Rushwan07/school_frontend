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
import { DatePicker } from "@/components/DatePicker";
import { Label } from "@/components/ui/label";

const CreateAssignment = ({ classes, subjects }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [subjectName, setSubjectName] = useState("");
    const [description, setDescription] = useState("");
    const [classId, setClassId] = useState("");

    const [lessons, setLessons] = useState([]);
    const [teacher, setTeacher] = useState();

    const [tempLesson, setTempLesson] = useState("");

    const handleSubmit = async () => {
        console.log({ subjectName, description, classId, lessons, teacher });

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
    const handleAddLesson = () => {
        if (tempLesson.trim()) {
            setLessons((prev) => [...prev, tempLesson]);
            setTempLesson("");
        }
    };

    const handleRemoveLesson = (indexToRemove) => {
        setLessons((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const teachOptions = [
        {
            _id: "123",
            name: "teachernam",
        },
        {
            _id: "123c",
            name: "teachernam2",
        },
        {
            _id: "1231",
            name: "teachernam3",
        },
    ];
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {" "}
            <DialogTrigger>
                <Plus />
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Subject</DialogTitle>
                </DialogHeader>
                <Label>Subject name</Label>
                <Input
                    type="text"
                    placeholder="Event name"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
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
                <Label>Teacher</Label>
                <Select value={teacher} onValue onValueChange={(e) => setTeacher(e)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                        {teachOptions?.map((value) => (
                            <SelectItem key={value?._id} value={value?._id}>
                                {value?.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* <Input
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                /> */}
                <div>
                    <Label>Lessons</Label>
                    <ol className="list-decimal pl-5 space-y-2">
                        {lessons?.map((lesson, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{lesson}</span>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemoveLesson(index)}
                                >
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ol>
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <Input
                            type="text"
                            value={tempLesson}
                            onChange={(e) => setTempLesson(e.target.value)}
                            placeholder="Enter lesson"
                        />
                        <Button onClick={handleAddLesson}>Add</Button>
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

export default CreateAssignment;
