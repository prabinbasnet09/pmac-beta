import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import getDay from "date-fns/getDay";
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { ActiveUser } from "@/pages/_app";

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
  const activeUser = useContext(ActiveUser);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then((user) => true)
        .catch((err) => {
          console.log(err);

          router.push("/login");
        });
    };
    fetchUser();
  }, []);

  function handleEventClick(clickInfo) {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${clickInfo.event.title}?`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    console.log(selectInfo.startStr);
    const startDateTimeString = selectInfo.startStr;
    const startDateTime = parseISO(startDateTimeString);
    const startTimeString = format(startDateTime, "HH:mm");
    console.log();
    console.log(startTimeString);

    const dayOfTheWeek = `${getDay(startDateTime)}`;
    console.log(dayOfTheWeek);

    const endDateTimeString = selectInfo.endStr;
    const endDateTime = parseISO(endDateTimeString);
    const endTimeString = format(endDateTime, "HH:mm");
    console.log();
    console.log(endTimeString);

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        daysOfWeek: [dayOfTheWeek],
        startRecur: selectInfo.startStr,
        startTime: startTimeString,
        endTime: endTimeString,
      });
    }

    setAllEvents((prevEvents) => {
      const newEvent = {
        id: createEventId(),
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        daysOfWeek: [dayOfTheWeek],
        startTime: startTimeString,
        endTime: endTimeString,
      };
      const updatedEvents = [...prevEvents, newEvent];
      return updatedEvents;
    });
  };

  const handleEventChange = (changeInfo) => {
    setAllEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) => {
        if (event.id === changeInfo.event.id) {
          return {
            ...event,
            title: changeInfo.event.title,
            start: changeInfo.event.startStr,
            end: changeInfo.event.endStr,
          };
        } else {
          return event;
        }
      });
      return updatedEvents;
    });
  };

  const handleEventRemove = (removeInfo) => {
    setAllEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter(
        (event) => event.id !== removeInfo.event.id
      );
      return updatedEvents;
    });
  };

  return activeUser ? (
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
                center: "prev,next",
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
              select={handleDateSelect}
              selectLongPressDelay={1000}
              eventChange={handleEventChange}
              eventRemove={handleEventRemove}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Schedular;
