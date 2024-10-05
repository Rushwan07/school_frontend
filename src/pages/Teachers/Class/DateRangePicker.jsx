import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePickerWithRange({ className, dates, setData }) {
    const [date, setDate] = React.useState({
        from: new Date(),
        to: addDays(new Date(), 20),
    });

    const toLocalISODate = (date) => {
        return date.toLocaleDateString("en-CA"); // 'en-CA' outputs in 'YYYY-MM-DD' format
    };

    React.useEffect(() => {
        if (date?.from && date?.to) {
            console.log({
                startDate: toLocalISODate(date.from), // Keep in local time
                dueDate: toLocalISODate(date.to),
            });
            setData((prev) => ({
                ...prev,
                startDate: toLocalISODate(date.from), // Keep in local time
                dueDate: toLocalISODate(date.to),
            }));
        }
    }, [date]);

    return (
        <div className={`grid gap-2 ${className}`}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={`w-full  justify-start text-left font-normal ${
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
