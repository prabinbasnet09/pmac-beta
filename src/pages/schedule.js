import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import parseISO from 'date-fns/parseISO';
import { useState, useEffect, useContext, useLayoutEffect } from 'react';

import ReactDatePicker from 'react-datepicker';
// import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import dynamic from 'next/dynamic';

const FullCalendar = dynamic(() => import('@fullcalendar/react'), {
  ssr: false,
});

function Schedular() {
  const [allEvents, setAllEvents] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load the fullcalendar-custom.css file when the page is rendered
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/fullcalendar-custom.css';
    document.head.appendChild(link);

    // Remove the link tag when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, [router.pathname]);

  useEffect(() => {
    setCalendarLoaded(true);
  }, []);

  const calendarOneEvents = [
    {
      id: '0',
      title: 'Unavailable',
      start: '2023-04-24T08:00:00-05:00',
      end: '2023-04-24T10:00:00-05:00',
      daysOfWeek: [`${getDay(parseISO('2023-04-24T08:00:00-05:00'))}`],
      startRecur: '2023-04-24',
      startTime: format(parseISO('2023-04-24T08:00:00-05:00'), 'HH:mm'),
      endTime: format(parseISO('2023-04-24T10:00:00-05:00'), 'HH:mm'),
    },
    {
      id: '1',
      title: 'Unavailable',
      start: '2023-04-26T08:00:00-05:00',
      end: '2023-04-26T10:00:00-05:00',
    },
    {
      id: '2',
      title: 'Unavailable',
      start: '2023-04-25T11:00:00-05:00',
      end: '2023-04-25T13:00:00-05:00',
    },
    {
      id: '3',
      title: 'Unavailable',
      start: '2023-04-27T11:00:00-05:00',
      end: '2023-04-27T13:00:00-05:00',
    },
    {
      id: '4',
      title: 'Unavailable',
      start: '2023-04-28T07:30:00-05:00',
      end: '2023-04-28T10:00:00-05:00',
    },
    {
      id: '5',
      title: 'Unavailable',
      start: '2023-04-24T13:00:00-05:00',
      end: '2023-04-24T17:00:00-05:00',
    },
    {
      id: '6',
      title: 'Unavailable',
      start: '2023-04-26T13:00:00-05:00',
      end: '2023-04-26T17:00:00-05:00',
    },
  ];

  const calendarTwoEvents = [
    {
      id: '0',
      title: 'Unavailable',
      start: '2023-04-24T09:00:00-05:00',
      end: '2023-04-24T11:00:00-05:00',
    },
    {
      id: '1',
      title: 'Unavailable',
      start: '2023-04-26T09:00:00-05:00',
      end: '2023-04-26T11:00:00-05:00',
    },
    {
      id: '2',
      title: 'Unavailable',
      start: '2023-04-28T08:00:00-05:00',
      end: '2023-04-28T11:00:00-05:00',
    },
    {
      id: '3',
      title: 'Unavailable',
      start: '2023-04-25T10:00:00-05:00',
      end: '2023-04-25T12:00:00-05:00',
    },
    {
      id: '4',
      title: 'Unavailable',
      start: '2023-04-27T10:00:00-05:00',
      end: '2023-04-27T12:00:00-05:00',
    },
    {
      id: '5',
      title: 'Unavailable',
      start: '2023-04-26T13:00:00-05:00',
      end: '2023-04-26T16:30:00-05:00',
    },
    {
      id: '6',
      title: 'Unavailable',
      start: '2023-04-24T13:00:00-05:00',
      end: '2023-04-24T16:30:00-05:00',
    },
  ];

  const calendarThreeEvents = [
    {
      id: '0',
      title: 'Unavailable',
      start: '2023-04-24T08:00:00-05:00',
      end: '2023-04-24T10:00:00-05:00',
    },

    {
      id: '1',
      title: 'Unavailable',
      start: '2023-04-26T08:00:00-05:00',
      end: '2023-04-26T10:00:00-05:00',
    },
    {
      id: '2',
      title: 'Unavailable',
      start: '2023-04-28T09:30:00-05:00',
      end: '2023-04-28T12:00:00-05:00',
    },

    {
      id: '3',
      title: 'Unavailable',
      start: '2023-04-25T14:00:00-05:00',
      end: '2023-04-25T16:00:00-05:00',
    },
    {
      id: '4',
      title: 'Unavailable',
      start: '2023-04-27T11:00:00-05:00',
      end: '2023-04-27T13:00:00-05:00',
    },
  ];

  function findOverlappingFreeSlots(calendarOneEvents, calendarTwoEvents) {
    const mergedEvents = [...calendarOneEvents, ...calendarTwoEvents].sort(
      (a, b) => {
        return new Date(a.start) - new Date(b.start);
      }
    );

    const freeSlots = [];

    for (let i = 0; i < mergedEvents.length - 1; i++) {
      const currentEvent = mergedEvents[i];
      const nextEvent = mergedEvents[i + 1];

      const currentEndTime = new Date(currentEvent.end).getTime();
      const nextStartTime = new Date(nextEvent.start).getTime();

      if (
        currentEvent.id !== nextEvent.id &&
        nextStartTime - currentEndTime >= 2 * 60 * 60 * 1000
      ) {
        const freeSlot = {
          id: `${freeSlots.length}`,
          title: 'Available',
          start: new Date(currentEvent.end).toISOString(),
          end: new Date(nextEvent.start).toISOString(),
        };
        freeSlots.push(freeSlot);
      }
    }

    return freeSlots;
  }

  const overlappingFreeSlots = findOverlappingFreeSlots(
    calendarOneEvents,
    calendarTwoEvents
  );

  function findAvailableSlots(calendars) {
    const mergedEvents = calendars.flat().sort((a, b) => {
      return new Date(a.start) - new Date(b.start);
    });

    const freeSlots = [];

    for (let i = 0; i < mergedEvents.length - 1; i++) {
      const currentEvent = mergedEvents[i];
      const nextEvent = mergedEvents[i + 1];

      const currentEndTime = new Date(currentEvent.end).getTime();
      const nextStartTime = new Date(nextEvent.start).getTime();

      if (nextStartTime - currentEndTime >= 2 * 60 * 60 * 1000) {
        let overlapping = true;
        for (let j = 0; j < calendars.length; j++) {
          const calendarEvents = calendars[j];
          const overlappingEvent = calendarEvents.find(event => {
            return (
              event.start <= currentEvent.end && event.end >= nextEvent.start
            );
          });
          if (overlappingEvent) {
            overlapping = false;
            break;
          }
        }
        if (overlapping) {
          const freeSlot = {
            id: `${freeSlots.length}`,
            title: 'Available',
            start: new Date(currentEvent.end).toISOString(),
            end: new Date(nextEvent.start).toISOString(),
          };
          freeSlots.push(freeSlot);
        }
      }
    }

    return freeSlots;
  }

  const availableSlots = findAvailableSlots([
    calendarOneEvents,
    calendarTwoEvents,
    calendarThreeEvents,
  ]);

  // const calendarAEvents = [
  //   { start: '2023-04-22T10:00:00', end: '2023-04-22T12:00:00', calendar: 'A' },
  //   { start: '2023-04-22T14:00:00', end: '2023-04-22T16:00:00', calendar: 'A' },
  // ];
  // const calendarBEvents = [
  //   { start: '2023-04-22T13:00:00', end: '2023-04-22T15:00:00', calendar: 'B' },
  //   { start: '2023-04-22T15:00:00', end: '2023-04-22T17:00:00', calendar: 'B' },
  // ];

  const createEventId = () => {
    return String(allEvents.length);
  };
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     await Auth.currentAuthenticatedUser()
  //       .then(user => true)
  //       .catch(err => {
  //         console.log(err);

  //         router.push('/login');
  //       });
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    console.log(allEvents);
  }, [allEvents]);

  function handleEventClick(clickInfo) {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${clickInfo.event.title}?`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  const handleDateSelect = selectInfo => {
    setToggle(prevState => !prevState);
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    console.log(selectInfo.startStr);
    const startDateTimeString = selectInfo.startStr;
    const startDateTime = parseISO(startDateTimeString);
    const startTimeString = format(startDateTime, 'HH:mm');
    console.log();
    console.log(startTimeString);

    const dayOfTheWeek = `${getDay(startDateTime)}`;
    console.log(dayOfTheWeek);

    const endDateTimeString = selectInfo.endStr;
    const endDateTime = parseISO(endDateTimeString);
    const endTimeString = format(endDateTime, 'HH:mm');
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

      setAllEvents(prevEvents => {
        const newEvent = {
          id: createEventId(),
          title: title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          daysOfWeek: [dayOfTheWeek],
          startRecur: selectInfo.startStr,
          startTime: startTimeString,
          endTime: endTimeString,
        };
        const updatedEvents = [...prevEvents, newEvent];
        return updatedEvents;
      });
    }
  };

  const handleEventChange = changeInfo => {
    setAllEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event => {
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

  const handleEventRemove = removeInfo => {
    setAllEvents(prevEvents => {
      const updatedEvents = prevEvents.filter(
        event => event.id !== removeInfo.event.id
      );
      return updatedEvents;
    });
  };

  const handleDate = date => {
    const newDate = new Date(date);
    const time = newDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return time;
  };

  const findFreeSlots = (calendarAEvents, calendarBEvents) => {
    const combinedEvents = [...calendarAEvents, ...calendarBEvents].map(
      event => ({
        start: new Date(event.start),
        end: new Date(event.end),
        calendar: event.calendar,
      })
    );

    combinedEvents.sort((a, b) => a.start - b.start);

    let freeSlots = [];
    let latestEndTimeA = new Date(-Infinity);
    let latestEndTimeB = new Date(-Infinity);

    for (let i = 0; i < combinedEvents.length - 1; i++) {
      const currentEvent = combinedEvents[i];
      const nextEvent = combinedEvents[i + 1];
      const gap = nextEvent.start - currentEvent.end;

      if (currentEvent.calendar === 'A') {
        latestEndTimeA = new Date(Math.max(latestEndTimeA, currentEvent.end));
      } else {
        latestEndTimeB = new Date(Math.max(latestEndTimeB, currentEvent.end));
      }

      const minEndTime = new Date(Math.min(latestEndTimeA, latestEndTimeB));
      const maxStartTime = new Date(
        Math.max(
          currentEvent.end,
          nextEvent.end === latestEndTimeA ? latestEndTimeB : latestEndTimeA
        )
      );

      if (gap > 0 && minEndTime <= maxStartTime) {
        freeSlots.push({ start: minEndTime, end: maxStartTime });
      }
    }
    console.log(freeSlots);
    return freeSlots;
  };
  console.log('hello');
  // findFreeSlots(calendarAEvents, calendarBEvents);

  return (
    <div className='flex items-center justify-center'>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          <div style={{ zIndex: '999' }} className='bg-maroon-500'>
            {calendarLoaded && (
              <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                headerToolbar={{
                  right: 'addEventButton',
                  center: 'prev,next',
                }}
                customButtons={{ addEventButton: { text: 'Add Event' } }}
                initialView='timeGridWeek'
                editable={true}
                selectable={true}
                weekends={false}
                events={calendarOneEvents}
                eventClick={handleEventClick}
                eventColor='maroon'
                nowIndicator={true}
                selectMirror={true}
                dateClick={info => alert('clicked' + info.dateStr)}
                select={handleDateSelect}
                selectLongPressDelay={1000}
                eventChange={handleEventChange}
                eventRemove={handleEventRemove}
                slotMinTime='07:00:00'
                slotMaxTime='18:00:00'
                allDaySlot={false}
                height='auto'
              />
            )}
          </div>

          {/* <div>
            {toggle ? (
              <div className='border border-black bg-red'>
                <h1>PopUp</h1>
                <button onClick={() => setToggle(prevState => !prevState)}>
                  Add
                </button>
              </div>
            ) : null}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Schedular;
