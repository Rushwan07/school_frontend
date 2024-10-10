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
        return events.some(
            (event) =>
                new Date(event.startDate).toDateString() === date.toDateString() ||
                new Date(event.dueDate).toDateString() === date.toDateString(),
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
                    .filter(
                        (Event) =>
                            new Date(Event.startDate).toDateString() === value.toDateString() ||
                            new Date(Event.dueDate).toDateString() === value.toDateString(),
                    )
                    .map((Event) => (
                        <div key={Event._id} className="mb-2">
                            <h3 className="font-semibold">
                                {/* Conditional rendering of "Submit the assignment" */}
                                {new Date(Event.dueDate).toDateString() ===
                                    value.toDateString() && <span>End of the Event: </span>}
                                {Event.title}
                            </h3>
                            <p>{Event.description}</p>
                            <p>From: {new Date(Event.startDate).toLocaleString()}</p>
                            <p>Due: {new Date(Event.dueDate).toLocaleString()}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default EventCalendar;
