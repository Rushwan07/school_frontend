import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pen } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { toast } from "@/hooks/use-toast";

const EditGrade = ({ setGrade, item }) => {
    console.log(item);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(item?.name);
    const [startingMark, setStartingMark] = useState(item?.startingMark);
    const [endingMark, setEndingMark] = useState(item?.endingMark);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.put(BASE_URL + "/grades/" + item?._id, {
                name,
                startingMark,
                endingMark,
            });

            console.log(res?.data?.data?.grade);
            setGrade((prev) => {
                let val = prev.map((val) =>
                    val._id == res?.data?.data?.grade?._id ? res?.data?.data?.grade : val,
                );
                return val;
            });
        } catch (error) {
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

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center gap-1">
                    <Pen size={18} /> Edit
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Grade</DialogTitle>
                </DialogHeader>{" "}
                <div className="space-y-5">
                    <div>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            placeholder="Grade Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Starting Mark</Label>
                        <Input
                            type="text"
                            placeholder="Starting Mark"
                            value={startingMark}
                            onChange={(e) => setStartingMark(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Ending Mark</Label>
                        <Input
                            type="text"
                            placeholder="Ending Mark"
                            value={endingMark}
                            onChange={(e) => setEndingMark(e.target.value)}
                        />
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

export default EditGrade;
