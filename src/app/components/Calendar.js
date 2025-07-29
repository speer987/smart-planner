import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Calendar() {
  return (
    <div className="flex flex-col gap-2 p-5 bg-white rounded-md text-indigo-900">
      {monthData?.monthly_goal}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date(2025, 0, 1)}
      />
    </div>
  );
}
