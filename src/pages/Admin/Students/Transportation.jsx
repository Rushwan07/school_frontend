import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle"; // adjust import path as necessary
import { Eye } from "lucide-react"; // adjust import path as necessary
import { Input } from "@/components/ui/input"; // adjust import path as necessary
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select"; // adjust import path as necessary
import { Label } from "@/components/ui/label"; // adjust import path as necessary

const TransportationComponent = ({ setStudentData, studentData, transports }) => {
    const [strokeToggle, setStrokeToggle] = useState(false); // Manage toggle state

    const handleToggleChange = (pressed) => {
        setStrokeToggle(pressed); // Update toggle state
        // Optionally, reset transportation fields if toggle is turned off
        if (!pressed) {
            setStudentData((prev) => ({
                ...prev,
                transportation: {
                    busId: "",
                    pickupLocation: "",
                    dropOffLocation: "",
                },
            }));
        }
    };

    // Extract all bus ids and stops
    const busIds = transports.map((transport) => transport._id);
    const getStopsForBus = (busId) => {
        const selectedBus = transports.find((transport) => transport._id === busId);
        return selectedBus ? selectedBus.stops : [];
    };

    return (
        <div>
            <h4 className="text-md  text-lg font-semibold  flex justify-between items-center">
                Transportation
                <Toggle
                    variant="outline"
                    size="lg"
                    aria-label="stroke-solid"
                    pressed={strokeToggle}
                    onPressedChange={handleToggleChange}
                >
                    <Eye className="h-4 w-4" />
                </Toggle>
            </h4>
            {strokeToggle && ( // Only show transportation fields if toggle is pressed
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label>Bus Number</Label>
                        <Select
                            name="busId"
                            value={studentData.transportation.busId}
                            onValueChange={(value) =>
                                setStudentData((prev) => ({
                                    ...prev,
                                    transportation: {
                                        ...prev.transportation,
                                        busId: value,
                                        pickupLocation: "", // Reset the stops when bus id changes
                                        dropOffLocation: "",
                                    },
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select bus" />
                            </SelectTrigger>
                            <SelectContent>
                                {transports.map((bus) => (
                                    <SelectItem key={bus._id} value={bus._id}>
                                        Bus {bus.busNumber}{" "}
                                        {/* You can still display busNumber here */}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {studentData.transportation.busId && (
                        <>
                            <div>
                                <Label>Pickup Location</Label>
                                <Select
                                    name="pickupLocation"
                                    value={studentData.transportation.pickupLocation}
                                    onValueChange={(value) =>
                                        setStudentData((prev) => ({
                                            ...prev,
                                            transportation: {
                                                ...prev.transportation,
                                                pickupLocation: value,
                                            },
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Pickup Location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getStopsForBus(studentData.transportation.busId).map(
                                            (stop) => (
                                                <SelectItem
                                                    key={stop.stopNumber}
                                                    value={stop.place + " " + "(" + stop.time + ")"}
                                                >
                                                    {stop.place} ({stop.time})
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Drop Off Location</Label>
                                <Select
                                    name="dropOffLocation"
                                    value={studentData.transportation.dropOffLocation}
                                    onValueChange={(value) =>
                                        setStudentData((prev) => ({
                                            ...prev,
                                            transportation: {
                                                ...prev.transportation,
                                                dropOffLocation: value,
                                            },
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Drop Off Location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getStopsForBus(studentData.transportation.busId).map(
                                            (stop) => (
                                                <SelectItem
                                                    key={stop.stopNumber}
                                                    value={stop.place + " " + "(" + stop.time + ")"}
                                                >
                                                    {stop.place} ({stop.time})
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                </div>
            )}{" "}
            {studentData.transportation.busId && (
                <div>
                    <Label>Bus Fees</Label>
                    <Input
                        name="fees"
                        type="number"
                        className="w-full  "
                        value={studentData.transportation.fees}
                        onChange={(e) =>
                            setStudentData((prev) => ({
                                ...prev,
                                transportation: {
                                    ...prev.transportation,
                                    fees: e.target.value,
                                },
                            }))
                        }
                        placeholder="Enter Bus fees"
                    />
                </div>
            )}
        </div>
    );
};

export default TransportationComponent;
