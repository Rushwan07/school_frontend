import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CreateAssignment = ({ subjects, setSubjects, teacher }) => {
    const [tempSubject, setTempSubject] = useState({
        subjectName: "",
        description: "",
        teacher: "",
        lessons: [],
    });
    const [tempLesson, setTempLesson] = useState("");

    // Handle adding a lesson for the current subject
    const handleAddLesson = () => {
        if (tempLesson.trim()) {
            setTempSubject((prev) => ({
                ...prev,
                lessons: [...prev.lessons, tempLesson],
            }));
            setTempLesson("");
        }
    };

    // Handle removing a lesson
    const handleRemoveLesson = (indexToRemove) => {
        setTempSubject((prev) => ({
            ...prev,
            lessons: prev.lessons.filter((_, index) => index !== indexToRemove),
        }));
    };

    // Handle adding a new subject to the subjects array
    const handleAddSubject = () => {
        if (tempSubject.subjectName && tempSubject.description && tempSubject.teacher) {
            setSubjects((prev) => [...prev, tempSubject]);
            setTempSubject({
                subjectName: "",
                description: "",
                teacher: "",
                lessons: [],
            });
        }
    };

    // Handle removing a subject
    const handleRemoveSubject = (indexToRemove) => {
        setSubjects((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div>
            <DialogHeader>
                <DialogTitle>Create Subject and Lessons</DialogTitle>
            </DialogHeader>

            {/* Subject form */}
            <div className="border p-4 rounded-lg mb-5">
                <Label>Subject Name</Label>
                <Input
                    type="text"
                    placeholder="Subject Name"
                    value={tempSubject.subjectName}
                    onChange={(e) =>
                        setTempSubject((prev) => ({
                            ...prev,
                            subjectName: e.target.value,
                        }))
                    }
                />

                <Label>Description</Label>
                <Textarea
                    placeholder="Enter description"
                    rows="3"
                    value={tempSubject.description}
                    onChange={(e) =>
                        setTempSubject((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />

                <Label>Teacher</Label>
                <Select
                    value={tempSubject.teacher}
                    onValueChange={(value) =>
                        setTempSubject((prev) => ({ ...prev, teacher: value }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                        {teacher.map((option) => (
                            <SelectItem key={option._id} value={option._id}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Lessons */}
                <div>
                    <Label>Lessons</Label>
                    <ol className="list-decimal pl-5 space-y-2">
                        {tempSubject.lessons.map((lesson, index) => (
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
                        <Button onClick={handleAddLesson}>Add Lesson</Button>
                    </div>
                </div>

                <Button className="mt-4" onClick={handleAddSubject}>
                    Create
                </Button>
            </div>

            {/* Display added subjects */}
            <div>
                <h3 className="text-lg font-semibold">Added Subjects</h3>
                {subjects.map((subject, index) => (
                    <div key={index} className="border p-4 rounded-lg mb-3">
                        <h4 className="font-bold">{subject.subjectName}</h4>
                        <p>Description: {subject.description}</p>
                        <p>Teacher: {teacher.find((t) => t._id === subject.teacher)?.name}</p>
                        <ul>
                            {subject.lessons.map((lesson, idx) => (
                                <li key={idx} className="ml-4">
                                    Lesson {idx + 1}: {lesson}
                                </li>
                            ))}
                        </ul>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveSubject(index)}
                        >
                            Remove Subject
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateAssignment;
