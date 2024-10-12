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

import { DatePickerWithRange } from "./DateRangePicker";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateAssignment = ({ setAssignments }) => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [subjects, setSubjects] = useState([]);

    const [classes, setClasses] = useState([]);

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
            const res = await axios.post(BASE_URL + "/assignments", data, {
                headers: { token: token },
            });
            console.log(res?.data?.data?.assignment);
            setAssignments((prev) => [...prev, res?.data?.data?.assignment]);
            setDialogOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);
            toast({
                variant: "destructive",
                title: error?.response?.data?.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getClass = async () => {
            try {
                console.log("working fine");
                const res = await axios.get(BASE_URL + "/classes", {
                    headers: { token: token },
                });
                // const res2 = await axios.get(BASE_URL + "/subjects/", {
                //     headers: { token: token },
                // });

                setClasses(res?.data?.data?.class);
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
            }
        };
        getClass();
    }, []);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {" "}
            <DialogTrigger>
                <Plus />
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
                        {classes.map((classItem) =>
                            classItem.subjectsId.map((subject) => (
                                <SelectItem key={subject._id} value={subject._id}>
                                    {subject.name}
                                </SelectItem>
                            )),
                        )}
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
                <Label>Due Date</Label>
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

export default CreateAssignment;
