import React, { useState } from "react";
import BigCalendar from "./BigCalendar";
import EventCalendar from "./EventCalendar";
const Events = () => {
    const events = [
        {
            _id: "670509f30283e5ca5122723c",
            title: "Write about someone",
            startDate: "2024-10-03T18:30:00.000Z",
            dueDate: "2024-10-18T00:00:00.000Z",
            description: "Description about the assignment",
            classId: "6704ec91fee39a5e6ebd0162",
            subjectId: "6704ea5418b730aed6cc5089",
        },
    ];

    const [selectedDate, setSelectedDate] = useState(new Date());

    // Function to handle date click from EventCalendar
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule (4A)</h1>
                    {/* Pass assignments and selectedDate to BigCalendar */}
                    <BigCalendar events={events} selectedDate={selectedDate} />
                </div>
            </div>

            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                {/* Pass assignments and date click handler to EventCalendar */}
                <EventCalendar events={events} onDateClick={handleDateClick} />
            </div>
        </div>
    );
};

export default Events;
