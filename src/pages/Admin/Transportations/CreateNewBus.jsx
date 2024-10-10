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

const CreateAssignment = ({ classes }) => {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [stops, setStops] = useState([]);

    const [name, setName] = useState("");
    const [busNo, setBusNo] = useState("");
    const [tempStop, setTempStop] = useState({
        stopNumber: "",
        place: "",
        time: "",
        transportationFees: "",
    });

    const handleAddStop = () => {
        if (
            tempStop.stopNumber &&
            tempStop.place.trim().length > 0 &&
            tempStop.time &&
            tempStop.transportationFees.trim().length > 0
        ) {
            setStops((prev) => [...prev, tempStop]);
            setTempStop({
                stopNumber: "",
                place: "",
                time: "",
                transportationFees: "",
            });
        }
    };

    const handleRemoveStop = (index) => {
        setStops((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        console.log({ stops, name, busNo });

        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

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
                <Plus />
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Create Transportation</DialogTitle>
                </DialogHeader>
                <Label>Driver name</Label>
                <Input
                    type="text"
                    placeholder="Driver  name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label>Bus number</Label>
                <Input
                    placeholder="Enter Busno here"
                    value={busNo}
                    onChange={(e) => setBusNo(e.target.value)}
                />

                <div>
                    <Label>Stops</Label>
                    <ol>
                        {stops?.map((stop, index) => {
                            return (
                                <li key={index} className="flex items-center space-x-4 py-2">
                                    <span className="font-semibold">{stop.stopNumber}.</span>
                                    <span className="text-gray-700 flex-grow">
                                        {stop.place} at {stop.time} (&#8377;
                                        {stop.transportationFees})
                                    </span>
                                    <Button
                                        variant="outline"
                                        className="bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => handleRemoveStop(index)}
                                    >
                                        Remove
                                    </Button>
                                </li>
                            );
                        })}
                    </ol>

                    {/* Form for adding new stop */}
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div>
                            <Label>Stop Number</Label>
                            <Input
                                type="number"
                                value={tempStop.stopNumber}
                                onChange={(e) =>
                                    setTempStop((prev) => ({ ...prev, stopNumber: e.target.value }))
                                }
                                placeholder="Stop Number"
                            />
                        </div>
                        <div>
                            <Label>Place</Label>
                            <Input
                                type="text"
                                value={tempStop.place}
                                onChange={(e) =>
                                    setTempStop((prev) => ({ ...prev, place: e.target.value }))
                                }
                                placeholder="Place"
                            />
                        </div>
                        <div>
                            <Label>Time</Label>
                            <Input
                                type="time"
                                value={tempStop.time}
                                onChange={(e) =>
                                    setTempStop((prev) => ({ ...prev, time: e.target.value }))
                                }
                            />
                        </div>
                        <div>
                            <Label>Transportation Fees</Label>
                            <Input
                                type="text"
                                value={tempStop.transportationFees}
                                onChange={(e) =>
                                    setTempStop((prev) => ({
                                        ...prev,
                                        transportationFees: e.target.value,
                                    }))
                                }
                                placeholder="Fees"
                            />
                        </div>
                    </div>

                    <Button variant="outline" className="bg-gray-300" onClick={handleAddStop}>
                        Add Stop
                    </Button>
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

export default CreateAssignment;
