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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { toast } from "@/hooks/use-toast";

const CreateGrade = ({ setGrade }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [startingMark, setStartingMark] = useState("");
    const [endingMark, setEndingMark] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post(BASE_URL + "/grades", {
                name,
                startingMark,
                endingMark,
            });
            setName("");
            setStartingMark("");
            setEndingMark("");
            setGrade((prev) => [...prev, res?.data?.data?.grade]);
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
                    <Plus size={18} />
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

export default CreateGrade;
