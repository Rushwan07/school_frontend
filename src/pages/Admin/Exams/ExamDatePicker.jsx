import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// DatePicker Component
export function DatePicker({ setDate, subjectId, updateSubjectDate }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const toLocalISODate = (date) => {
        return date.toLocaleDateString("en-CA"); // 'en-CA' outputs in 'YYYY-MM-DD' format
    };

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = toLocalISODate(selectedDate);
            setDate(formattedDate);
            updateSubjectDate(subjectId, formattedDate); // Update the date for the specific subject
        }
    }, [selectedDate]);

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
