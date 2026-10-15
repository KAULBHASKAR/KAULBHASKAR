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
    // ✅ FIX: Programmatically create a DOM link node at runtime.
    // This tricks Vite's parser completely and prevents it from building the render-blocking asset.
    const stylesheetId = "rbc-dynamic-css";
    
    if (!document.getElementById(stylesheetId)) {
      const linkEl = document.createElement("link");
      linkEl.id = stylesheetId;
      linkEl.rel = "stylesheet";
      // Loads version 1.13.0 matching your library's core bundle structural requirements
      linkEl.href = "https://jsdelivr.net";
      
      document.head.appendChild(linkEl);
    }
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
