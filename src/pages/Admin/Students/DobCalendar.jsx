"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ReactCalendar from "react-calendar";

export function DatePicker({ setDate }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const toLocalISODate = (date) => {
        return date.toLocaleDateString("en-CA");
    };

    useEffect(() => {
        if (selectedDate) {
            setDate(toLocalISODate(selectedDate));
        }
    }, [selectedDate, setDate]);

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={`w-full pl-3 text-left font-normal ${
                            !selectedDate ? "text-muted-foreground" : ""
                        }`}
                    >
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fix p-0 block" align="start">
                    <ReactCalendar
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
