import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, PenBox, Plus } from "lucide-react";
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
import { toast } from "@/hooks/use-toast";

const EditEvent = ({ item, setEvents }) => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [eventName, setEventName] = useState(item?.name || "");
    const [description, setDescription] = useState(item?.description || "");
    const [classId, setClassId] = useState(item?.classId?._id || "--");
    const [date, setDate] = useState({
        startDate: item?.dates[0],
        dueDate: item?.dates[item?.dates?.length - 1],
    });
    const [startTime, setStartTime] = useState(item?.startTime || "");
    const [endTime, setEndTime] = useState(item?.endTime || "");

    const [classes, setClasses] = useState([]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.put(
                `${BASE_URL}/events/${item._id}`,
                {
                    eventName,
                    description,
                    classId,
                    date,
                    startTime: startTime.trim(),
                    endTime: endTime.trim(),
                },

                {
                    withCredentials: true,
                },
            );
            const singleEvent = res?.data?.data?.event;

            setEvents((prev) =>
                prev.map((assignment) =>
                    assignment._id === singleEvent._id ? singleEvent : assignment,
                ),
            );

            setDialogOpen(false);
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

    useEffect(() => {
        const getClass = async () => {
            try {
                const res = await axios.get(BASE_URL + "/classes", {
                    headers: { token: token },
                });

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
                <Edit />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Event</DialogTitle>
                </DialogHeader>
                <Label>Event name</Label>
                <Input
                    type="text"
                    placeholder="Event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />{" "}
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
                        <SelectItem value="--">Select all</SelectItem>
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
                <DatePickerWithRange setData={setDate} dates={date} />
                <Label>Start time</Label>
                <Input
                    aria-label="Time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <Label>End time</Label>
                <Input
                    aria-label="Time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
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
