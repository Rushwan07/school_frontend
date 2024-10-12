import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EventCalendar = ({ events, onDateClick }) => {
    const [value, setValue] = useState(new Date());

    const handleDateChange = (date) => {
        setValue(date);
        onDateClick(date); // Pass the selected date to the parent
    };

    // Function to determine if a date has assignments
    const hasAssignment = (date) => {
        // Check if the given `date` exists in any of the events' `dates` array
        return events?.some((event) =>
            event?.dates?.some(
                (eventDate) => new Date(eventDate).toDateString() === date.toDateString(),
            ),
        );
    };

    return (
        <div className="bg-white p-4 rounded-md">
            <Calendar
                onChange={handleDateChange}
                value={value}
                tileClassName={({ date, view }) =>
                    view === "month" && hasAssignment(date) ? "highlight" : null
                }
            />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Events</h1>
            </div>

            {/* Render assignment details for the selected day */}
            <div>
                {events
                    ?.filter((Event) =>
                        Event.dates.some(
                            (eventDate) =>
                                new Date(eventDate).toDateString() === value.toDateString(),
                        ),
                    )
                    ?.map((Event) => (
                        <div key={Event._id} className="mb-2">
                            <h3 className="font-semibold">{Event.title}</h3>
                            <p>{Event.description}</p>
                            <p>From: {new Date(Event.dates[0]).toLocaleString()}</p>
                            <p>
                                Due:{" "}
                                {new Date(Event.dates[Event.dates.length - 1]).toLocaleString()}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default EventCalendar;
