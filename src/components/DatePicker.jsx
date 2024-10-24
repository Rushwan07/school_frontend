"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns"; // Added parseISO to handle ISO date strings
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker({ setDate, date }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const toLocalISODate = (date) => {
        return date.toLocaleDateString("en-CA");
    };

    useEffect(() => {
        if (date) {
            const parsedDate = parseISO(date);
            setSelectedDate(parsedDate);
        }
    }, [date]);

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
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
