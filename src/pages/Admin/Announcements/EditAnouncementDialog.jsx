import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pen, PenBox, Plus } from "lucide-react";
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
import axios from "axios";

const CreateAnouncementDialog = ({ item, setAnounceMents }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        classId: "",
    });
    const handleSubmit = async () => {
        let updatedFleet;
        setLoading(true);
        try {
            const res = await axios.put(BASE_URL + "/anouncements/" + item._id, data, {
                withCredentials: true,
            });

            setAnounceMents((prev) =>
                prev.map((announcement) =>
                    announcement._id === item._id ? { ...announcement, ...data } : announcement,
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
            <DialogTrigger>
                <Button size={"icon"} variant={"outline"} onClick={() => setData(item)}>
                    <PenBox />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Announcement</DialogTitle>
                </DialogHeader>
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
                <Label>Class</Label>
                <Select
                    value={data.classId}
                    onValue
                    onValueChange={(e) => setData((prev) => ({ ...prev, classId: e }))}
                >
                    <Label>{item?.classId?.name}</Label>
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

                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAnouncementDialog;
