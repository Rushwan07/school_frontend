import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

export function DatePickerWithRange({ className, dates, setData }) {
    // Convert the incoming ISO date to local date for display
    const toLocalDate = (isoDate) => {
        return new Date(isoDate);
    };

    // Set initial default date if dates are provided
    const [date, setDate] = React.useState(() => {
        if (dates?.startDate && dates?.dueDate) {
            return {
                from: toLocalDate(dates.startDate),
                to: toLocalDate(dates.dueDate),
            };
        }
        return undefined;
    });

    // Utility to convert date to 'YYYY-MM-DD' format
    const toLocalISODate = (date) => {
        return date.toLocaleDateString("en-CA"); // 'en-CA' outputs in 'YYYY-MM-DD' format
    };

    // Handle date change and update the parent state
    React.useEffect(() => {
        if (date?.from && date?.to) {
            console.log("Date selected successfully");

            setData((prev) => ({
                ...prev,
                startDate: toLocalISODate(date.from), // Keep in local time
                dueDate: toLocalISODate(date.to),
            }));

            toast({
                title: `Date selected successfully`,
                description: `From: ${toLocalISODate(date.from)} 
                To: ${toLocalISODate(date.to)}`,
            });
        }
    }, [date, setData]);

    return (
        <div className={`grid gap-2 ${className}`}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                            !date ? "text-muted-foreground" : ""
                        }`}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
