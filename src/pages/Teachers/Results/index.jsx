import { Input } from "@/components/ui/input";
import { ArrowDownAZ, Plus, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
const Results = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated locally!");
        setIsOpen(false); // Close the dialog
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Results</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search Results"
                        className="border rounded px-3 py-2"
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <div>
                                    {" "}
                                    <MdAdd size={30} className="cursor-pointer" />{" "}
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Lesson</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <Select label="Student" className="mb-3">
                                        <SelectTrigger className="mb-3">
                                            <SelectValue placeholder="Select student" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">John</SelectItem>
                                            <SelectItem value="2">Rock</SelectItem>
                                            <SelectItem value="3">Randy orton</SelectItem>
                                            <SelectItem value="4">Khalli</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select className="mb-3">
                                        <SelectTrigger className="mb-3">
                                            <SelectValue placeholder="Select Subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">MAths</SelectItem>
                                            <SelectItem value="2">Science</SelectItem>
                                            <SelectItem value="3">Physics</SelectItem>
                                            <SelectItem value="4">Chemistry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        label="Title"
                                        name="title"
                                        onChange={handleChange}
                                        required
                                        className="mb-3"
                                        placeholder="Title"
                                    />
                                    <Textarea
                                        label="Address"
                                        name="address"
                                        onChange={handleChange}
                                        className="mb-3"
                                        placeholder="Description"
                                        required
                                    />
                                    <Select label="Sex" className="mb-3">
                                        <SelectTrigger className="mb-3">
                                            <SelectValue placeholder="Select Subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">MAths</SelectItem>
                                            <SelectItem value="2">Science</SelectItem>
                                            <SelectItem value="3">Physics</SelectItem>
                                            <SelectItem value="4">Chemistry</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select label="Sex" className="mb-3">
                                        <SelectTrigger className="mb-3">
                                            <SelectValue placeholder="Select Class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">Class 9-A</SelectItem>
                                            <SelectItem value="2">Class 10-A</SelectItem>
                                            <SelectItem value="3">Class 10-B</SelectItem>
                                            <SelectItem value="4">Class 10-C</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        label="Date"
                                        type="date"
                                        name="Date"
                                        onChange={handleChange}
                                        required
                                        className="mb-3"
                                    />
                                    <Input
                                        label="Duration"
                                        type="number"
                                        name="duration"
                                        onChange={handleChange}
                                        required
                                        placeholder="Duration in minute"
                                        className="mb-3"
                                    />

                                    <DialogFooter>
                                        <Button type="submit">Create</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
