import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ events, selectedDate }) => {
    console.log(events);

    const eventss = events?.flatMap((event) => {
        // If there's only one date, return a single object with start and end
        if (event.dates.length === 1) {
            const eventDate = new Date(event.dates[0]);

            const startEvent = new Date(eventDate);
            const [startHour, startMinute] = event.startTime.split(":");
            startEvent.setHours(startHour, startMinute, 0, 0);

            const endEvent = new Date(eventDate);
            const [endHour, endMinute] = event.endTime.split(":");
            endEvent.setHours(endHour, endMinute, 0, 0);

            return [
                {
                    id: `${event._id}-${event.dates[0]}`,
                    title: `${event.name}`,
                    start: startEvent,
                    end: endEvent,
                },
            ];
        }

        // For multiple dates, return two objects
        const firstDate = new Date(event.dates[0]);
        const lastDate = new Date(event.dates[event.dates.length - 1]);

        // First date: event starts at startTime and lasts for 1 hour
        const startEvent = new Date(firstDate);
        const [startHour, startMinute] = event.startTime.split(":");
        startEvent.setHours(startHour, startMinute, 0, 0);

        const startEventEnd = new Date(startEvent);
        startEventEnd.setHours(parseInt(startHour) + 1, startMinute, 0, 0); // Lasts 1 hour

        // Last date: event ends at endTime, and lasts for 1 hour before the end
        const endEvent = new Date(lastDate);
        const [endHour, endMinute] = event.endTime.split(":");
        endEvent.setHours(endHour, endMinute, 0, 0);

        const endEventStart = new Date(endEvent);
        endEventStart.setHours(parseInt(endHour) - 1, endMinute, 0, 0); // Starts 1 hour before end

        return [
            {
                id: `${event._id}-${event.dates[0]}-start`,
                title: `${event.name} - (Start)`,
                start: startEvent,
                end: startEventEnd,
            },
            {
                id: `${event._id}-${event.dates[event.dates.length - 1]}-end`,
                title: `${event.name} - (End)`,
                start: endEventStart,
                end: endEvent,
            },
        ];
    });

    return (
        <Calendar
            localizer={localizer}
            events={eventss}
            startAccessor="start"
            endAccessor="end"
            views={["day"]}
            defaultView={Views.DAY}
            view={Views.DAY}
            date={selectedDate}
            style={{ height: "76vh" }}
            min={new Date(2025, 9, 2, 8, 0)} // Minimum time on the calendar view (8:00 AM)
            max={new Date(2025, 9, 2, 17, 0)}
        />
    );
};

export default BigCalendar;
