// src/components/CalendarComponent.tsx
import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { Event, View, DateLocalizer } from "react-big-calendar";
import type { FC } from "react";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

// Configured localizer isolated inside this chunk module context
const localizer: DateLocalizer = dateFnsLocalizer({
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
  const [currentDate, setCurrentDate] = useState(events[0].start);
  const [currentView, setCurrentView] = useState<View>("month");

  useEffect(() => {
    // ✅ FIX: Dynamically injects the global external css styles ONLY when this 
    // component actually mounts, cleanly removing it from your initial page load headers.
    import("react-big-calendar/lib/css/react-big-calendar.css");
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "90vw",
        margin: "0 auto",
        contain: "layout style",
      }}
    >
      <style>{`
        .rbc-calendar { min-width: 100%; overflow-x: auto; }
        .rbc-off-range-bg { background-color: #e5e7eb !important; }
        .rbc-off-range .rbc-button-link { color: #4b5563 !important; }
        .rbc-button-link { color: #111827 !important; font-weight: 600; }
      `}</style>

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
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          view={currentView}
          onView={(newView) => setCurrentView(newView)}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
