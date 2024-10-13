import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

const SubjectDetails = ({ subjects, teachers, onSubmit }) => {
    const [subjectName, setSubjectName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [lessons, setLessons] = useState([]);
    const [tempLesson, setTempLesson] = useState("");

    const handleAddLesson = () => {
        if (tempLesson.trim()) {
            setLessons((prev) => [...prev, tempLesson]);
            setTempLesson("");
        }
    };

    const handleRemoveLesson = (indexToRemove) => {
        setLessons((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleAddSubject = () => {
        const newSubject = {
            subjectName,
            description,
            teacher: selectedTeacher,
            lessons,
        };
        onSubmit(newSubject);
        setSubjectName("");
        setDescription("");
        setSelectedTeacher("");
        setLessons([]);
    };

    return (
        <div className="space-y-4">
            <Label>Subject Name</Label>
            <Input
                type="text"
                placeholder="Subject name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
            />

            <Label>Description</Label>
            <Textarea
                placeholder="Enter subject description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Label>Teacher</Label>
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                    {teachers.map((teacher) => (
                        <SelectItem key={teacher._id} value={teacher._id}>
                            {teacher.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label>Lessons</Label>
            <ol className="list-decimal pl-5">
                {lessons.map((lesson, index) => (
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

            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    placeholder="Add a lesson"
                    value={tempLesson}
                    onChange={(e) => setTempLesson(e.target.value)}
                />
                <Button onClick={handleAddLesson}>Add Lesson</Button>
            </div>

            <Button onClick={handleAddSubject}>Add Subject</Button>
        </div>
    );
};

export default SubjectDetails;
