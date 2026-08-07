import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { Event, View } from "react-big-calendar";
import type { FC } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events: Event[] = [
  {
    title: "Guru Purnima and Diksha Mahotsava",
    start: new Date(2026, 6, 29, 6, 0),
    end: new Date(2026, 6, 29, 17, 30),
  },
];

const CalendarComponent: FC = () => {
  // Default to the event's start date
  const [currentDate, setCurrentDate] = useState(events[0].start);
  const [currentView, setCurrentView] = useState<View>("month");

  return (
    <div
      style={{
        height: "100vh",
        width: "90vw",
        margin: "0 auto",
        contain: "layout style",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "3.5rem",
          color: "#B22222",
          margin: "30px 0 20px",
          fontWeight: "600",
        }}
      >
        Upcoming Event
      </h2>

      <div
        style={{
          height: 500,
          contain: "content",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          date={currentDate} // defaults to event date
          onNavigate={(newDate) => setCurrentDate(newDate)}
          view={currentView} // defaults to month view
          onView={(newView) => setCurrentView(newView)}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
