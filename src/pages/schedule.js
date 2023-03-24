import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useMemo, useCallback } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    start: new Date(2023, 2, 20, 11, 30),
    end: new Date(2023, 2, 21, 1, 0),
  },
  {
    title: "Vacation",
    start: new Date(2023, 2, 20, 12, 30),
    end: new Date(2023, 2, 21, 1, 0),
  },
  {
    title: "Conference",
    start: new Date(2023, 2, 20, 12, 30),
    end: new Date(2023, 2, 21, 1, 0),
  },
];

function Schedular() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 px-2 sm:px-0">
        <div className={`${"nav-body"}`}>
          <h1>
            <strong>Schedular</strong>
          </h1>
          <div style={{ position: "relative", zIndex: "999" }}>
            <h2>Add New Event</h2>
            <input
              type="text"
              placeholder="Add Title"
              style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <ReactDatePicker
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              showTimeSelect
              timeFormat="HH:mm"
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
            <ReactDatePicker
              placeholderText="End Date"
              selected={newEvent.end}
              showTimeSelect
              timeFormat="HH:mm"
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
            <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.WEEK}
            style={{ height: 500, margin: "50px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Schedular;
