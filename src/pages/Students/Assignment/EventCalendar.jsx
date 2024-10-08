import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EventCalendar = ({ assignments, onDateClick }) => {
    const [value, setValue] = useState(new Date());

    const handleDateChange = (date) => {
        setValue(date);
        onDateClick(date); // Pass the selected date to the parent
    };

    // Function to determine if a date has assignments
    const hasAssignment = (date) => {
        return assignments.some(
            (assignment) =>
                new Date(assignment.startDate).toDateString() === date.toDateString() ||
                new Date(assignment.dueDate).toDateString() === date.toDateString(),
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
                <h1 className="text-xl font-semibold my-4">Assignments</h1>
            </div>

            {/* Render assignment details for the selected day */}
            <div>
                {assignments
                    .filter(
                        (assignment) =>
                            new Date(assignment.startDate).toDateString() ===
                                value.toDateString() ||
                            new Date(assignment.dueDate).toDateString() === value.toDateString(),
                    )
                    .map((assignment) => (
                        <div key={assignment._id} className="mb-2">
                            <h3 className="font-semibold">
                                {/* Conditional rendering of "Submit the assignment" */}
                                {new Date(assignment.dueDate).toDateString() ===
                                    value.toDateString() && <span>Submit the assignment: </span>}
                                {assignment.title}
                            </h3>
                            <p>{assignment.description}</p>
                            <p>From: {new Date(assignment.startDate).toLocaleString()}</p>
                            <p>Due: {new Date(assignment.dueDate).toLocaleString()}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default EventCalendar;
