import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState, useMemo, useCallback } from "react";
import ReactDatePicker from "react-datepicker";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

const events_sources = [
  {
    events: [
      {
        title: "My Birthday",
        start: "2023-05-28",
        end: "2023-05-29",
      },
      {
        title: "Graduation Day",
        start: "2023-05-17",
        end: "2023-05-17",
      },
      {
        title: "Final Project Due",
        start: "2023-05-07T12:30:00",
        allDay: false,
      },
    ],
  },
  {
    events: [
      {
        title: "Pelican Cup Presentation",
        start: "2023-04-04",
        end: "2023-04-05",
      },
      {
        title: "Spring Break",
        start: "2023-04-07",
        end: "2023-04-14",
      },
      {
        title: "Operating System Exam",
        start: "2023-04-06",
        end: "2023-04-07",
      },
    ],
  },
];

function Schedular() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events_sources[0]);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  function handleEventClick(clickInfo) {
    if (
      window.confirm(
        "Are you sure you want to delete the event ${clickInfo.event.title}?"
      )
    ) {
      clickInfo.event.remove();
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 px-2 sm:px-0">
        <div className={`${"nav-body"}`}>
          <h1>
            <strong>Schedular</strong>
          </h1>
          <div style={{ position: "relative", zIndex: "999" }}>
            <FullCalendar
              plugins={[timeGridPlugin, dayGridPlugin]}
              headerToolbar={{
                left: "prev,next, today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="timeGridWeek"
              editable={true}
              selectable={true}
              weekends={false}
              eventSources={events_sources}
              eventClick={handleEventClick}
              eventColor="black"
              //   eventContent={renderEventContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedular;
