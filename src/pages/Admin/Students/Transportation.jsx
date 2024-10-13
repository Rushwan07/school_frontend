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
                    pickupLocation: "",
                    dropOffLocation: "",
                    busNumber: "",
                },
            }));
        }
    };

    // Extract all bus numbers and stops
    const busNumbers = transports.map((transport) => transport.busNumber);
    const getStopsForBus = (busNumber) => {
        const selectedBus = transports.find(
            (transport) => transport.busNumber === parseInt(busNumber),
        );
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
                            name="busNumber"
                            value={studentData.transportation.busNumber}
                            onValueChange={(value) =>
                                setStudentData((prev) => ({
                                    ...prev,
                                    transportation: {
                                        ...prev.transportation,
                                        busNumber: value,
                                        pickupLocation: "", // Reset the stops when bus number changes
                                        dropOffLocation: "",
                                    },
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select bus" />
                            </SelectTrigger>
                            <SelectContent>
                                {busNumbers.map((busNumber) => (
                                    <SelectItem key={busNumber} value={busNumber}>
                                        Bus {busNumber}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {studentData.transportation.busNumber && (
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
                                        {getStopsForBus(studentData.transportation.busNumber).map(
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
                                        {getStopsForBus(studentData.transportation.busNumber).map(
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
            )}
        </div>
    );
};

export default TransportationComponent;
