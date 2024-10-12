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
import { useSelector } from "react-redux";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditEvent = ({ item, setEvents }) => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [classId, setClassId] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

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
        name: "",
        endTime: "",
        description: "",
        classId: "",
        startTime: "",
    });
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.put(
                `${BASE_URL}/events/${item._id}`,
                {
                    ...data, // Spread the existing data object
                    dates: date, // Include the dates object directly
                },
                {
                    withCredentials: true,
                },
            );

            setEvents((prev) =>
                prev.map((assignment) =>
                    assignment._id === item._id ? { ...assignment, ...data } : assignment,
                ),
            );

            setDialogOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

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
                    <DialogTitle>Create Event</DialogTitle>
                </DialogHeader>
                <Label>Event name</Label>
                <Input
                    type="text"
                    placeholder="Event name"
                    value={data.name}
                    onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                />{" "}
                <Label>Description</Label>
                <Textarea
                    placeholder="Enter description here"
                    rows="5"
                    value={data.description}
                    onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                />
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
                {/* <Input
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                /> */}
                <Label>Date</Label>
                <DatePickerWithRange setData={setDate} />
                <Label>Start time</Label>
                <Input
                    aria-label="Time"
                    type="time"
                    value={data.startTime}
                    onChange={(e) => setData((prev) => ({ ...prev, startTime: e.target.value }))}
                />
                <Label>End time</Label>
                <Input
                    aria-label="Time"
                    type="time"
                    value={data.endTime}
                    onChange={(e) => setData((prev) => ({ ...prev, endTime: e.target.value }))}
                />
                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditEvent;
