import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pen, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateClassCard = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [startingMark, setStartingMark] = useState("");
    const [endingMark, setEndingMark] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Here you can add your API call or any function to handle the submission
            console.log("Grade Name:", name);
            console.log("Starting Mark:", startingMark);
            console.log("Ending Mark:", endingMark);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate an API request

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
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center gap-1">
                    <Pen size={18} /> Edit
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Grade</DialogTitle>
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

export default CreateClassCard;
