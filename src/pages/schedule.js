import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = [
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
];

function Schedular() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function renderEventContent(eventInfo) {
    var infoTitle = window.prompt("What is the title of your event?");

    setNewEvent({
      ...newEvent,
      title: infoTitle,
      start: eventInfo.startStr,
      end: eventInfo.endStr,
    });
    console.log(newEvent);
    setAllEvents([...allEvents, newEvent]);
    return console.log(allEvents);
  }

  // useEffect(() => {
  //   setAllEvents([...allEvents, newEvent]);
  // }, []);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  function handleEventClick(clickInfo) {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${clickInfo.event.title}?`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 px-2 sm:px-0">
        <div className={`${"nav-body"}`}>
          <div
            style={{ position: "relative", zIndex: "999" }}
            className="bg-maroon-500"
          >
            <FullCalendar
              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              headerToolbar={{
                right: "addEventButton",
              }}
              customButtons={{ addEventButton: { text: "Add Event" } }}
              initialView="timeGridWeek"
              editable={true}
              selectable={true}
              weekends={false}
              events={allEvents}
              eventClick={handleEventClick}
              eventColor="maroon"
              nowIndicator={true}
              selectMirror={true}
              dateClick={(info) => alert("clicked" + info.dateStr)}
              select={(info) => renderEventContent(info)}
              selectLongPressDelay={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedular;
