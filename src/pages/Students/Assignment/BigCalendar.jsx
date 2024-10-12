import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ assignments, selectedDate }) => {
    const events = assignments?.flatMap((assignment) => {
        const start = new Date(assignment?.startDate);
        const end = new Date(assignment?.dueDate);

        const startEvent = new Date(start);
        startEvent.setHours(8, 0, 0, 0);
        const startEventEnd = new Date(start);
        startEventEnd.setHours(9, 0, 0, 0);

        const endEvent = new Date(end);
        endEvent.setHours(8, 0, 0, 0);
        const endEventEnd = new Date(end);
        endEventEnd.setHours(9, 0, 0, 0);

        return [
            {
                id: `${assignment?._id}-start`,
                title: assignment?.title + "- (Start)",
                start: startEvent, // Assignment start date at 8:00 AM
                end: startEventEnd, // Ends at 9:00 AM
            },
            {
                id: `${assignment?._id}-end`,
                title: `${assignment?.title} - (Due)`, // Indicate it's the due date
                start: endEvent, // Assignment end date at 8:00 AM
                end: endEventEnd, // Ends at 9:00 AM
            },
        ];
    });

    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={["day"]}
            defaultView={Views.DAY}
            view={Views.DAY} // View set to day
            date={selectedDate} // Set the selected date
            style={{ height: "76vh" }}
            min={new Date(2025, 9, 2, 8, 0)} // Minimum time on the calendar view
            max={new Date(2025, 9, 2, 17, 0)} // Maximum time on the calendar view
        />
    );
};

export default BigCalendar;
