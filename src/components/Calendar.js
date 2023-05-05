import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import parseISO from 'date-fns/parseISO';
import { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';

import ReactDatePicker from 'react-datepicker';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useRouter } from 'next/router';
import * as mutations from '@/graphql/mutations';
import * as queries from '@/graphql/queries';
import { API } from 'aws-amplify';
import dynamic from 'next/dynamic';
import { ActiveUser } from '@/pages/_app';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Calendar(props) {
  const activeUser = useContext(ActiveUser);
  const [allEvents, setAllEvents] = useState([]);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const success = msg =>
    toast(msg, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      style: {
        backgroundColor: '#4BB543',
      },
    });

  const error = error =>
    toast(error, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      style: {
        backgroundColor: '#FF0000',
      },
    });

  let draggable = null;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const externalEventsEl = document.getElementById('external-events');
      if (externalEventsEl) {
        draggable = new Draggable(externalEventsEl, {
          itemSelector: '.fc-event',
          eventData: function (eventEl) {
            return {
              title: eventEl.innerText,
              id: Date.now(), // Assign a unique identifier to each dropped event
            };
          },
        });
      }
    }

    if (activeUser && activeUser.schedule && activeUser.schedule[0]) {
      try {
        setAllEvents(JSON.parse(activeUser.schedule));
      } catch (error) {
        console.log(activeUser.schedule);
      }
    }

    return () => {
      if (draggable) {
        draggable.destroy();
      }
    };
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
    return Math.random().toString(36).substring(2);
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

  console.log();

  function handleEventClick(clickInfo) {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${clickInfo.event.title}?`
      )
    ) {
      clickInfo.event.remove();
      success('Event deleted!');
    }
  }

  const handleDateSelect = selectInfo => {
    let title = 'Unavailable'; //prompt('Please enter a new title for your event');
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
    console.log(changeInfo);
    const startDateTimeString = changeInfo.event.startStr;
    const startDateTime = parseISO(startDateTimeString);
    const startTimeString = format(startDateTime, 'HH:mm');

    const dayOfTheWeek = `${getDay(startDateTime)}`;
    console.log(dayOfTheWeek);

    const endDateTimeString = changeInfo.event.endStr;
    const endDateTime = parseISO(endDateTimeString);
    const endTimeString = format(endDateTime, 'HH:mm');

    console.log(startTimeString, endTimeString);
    setAllEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event => {
        if (event.id === changeInfo.event.id) {
          console.log('match');
          return {
            ...event,
            title: changeInfo.event.title,
            start: changeInfo.event.startStr,
            end: changeInfo.event.endStr,
            daysOfWeek: [dayOfTheWeek],
            startRecur: changeInfo.event.startStr,
            startTime: startTimeString,
            endTime: endTimeString,
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

  const handleEventReceive = info => {
    if (typeof info.event === 'object') {
      const startDateTime = new Date(info.event.start);
      const startTimeString = startDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const endDateTime = info.event.end
        ? new Date(info.event.end)
        : new Date(startDateTime.getTime() + 60 * 60 * 1000);
      const endTimeString = endDateTime
        ? endDateTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })
        : null;
      const newEvent = {
        id: createEventId(),
        title: info.event.title,
        start: info.event.start.toISOString(),
        end: endDateTime ? endDateTime.toISOString() : null,
        daysOfWeek: [`${startDateTime.getDay()}`],
        startRecur: info.event.start.toISOString(),
        startTime: startTimeString,
        endTime: endTimeString,
      };
      setAllEvents([...allEvents, newEvent]);
    }
  };

  const handleSaveSchedule = async () => {
    try {
      await API.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: activeUser.id,
            schedule: JSON.stringify(allEvents),
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(res => {
          console.log(res);
          success('Schedule saved!');
        })
        .catch(err => {
          console.log(err);
          error('Error saving schedule!');
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(allEvents);

  return activeUser ? (
    <>
      <div style={{ zIndex: '999' }} className='bg-maroon-500'>
        <div id='external-events' className='absolute top-11 right-10 '>
          <div className='flex gap-4'>
            <div className='text-lg font-bold text-white my-auto'>
              Draggable &rarr;
            </div>
            <div className='fc-event cursor-pointer bg-[#FDB913] p-2 rounded-md text-black font-bold border-l-blue-50'>
              Unavailable
            </div>
          </div>
        </div>
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            right: '',
            left: 'prev,next',
            center: 'title',
          }}
          // customButtons={{ addEventButton: { text: 'Add Event' } }}
          initialView='timeGridWeek'
          editable={true}
          selectable={true}
          weekends={false}
          events={allEvents}
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
          eventReceive={handleEventReceive}
        />
      </div>
      <div
        className='mt-8 p-5 mx-auto bg-[#FDB913] text-center text-xl  text-red w-fit rounded-md hover:font-bold hover:shadow-md hover:shadow-[#fff] cursor-pointer'
        onClick={e => {
          e.preventDefault();
          handleSaveSchedule();
        }}
        disabled={allEvents.length === 0}
      >
        Save Schedule
      </div>

      {activeUser.group[0] === 'ChairCommittee' ? (
        <div className='flex justify-center'>
          <Link
            href={'/slots'}
            className='mt-8 p-5 bg-[#FDB913] text-center text-xl  text-red w-fit rounded-md hover:font-bold hover:shadow-md hover:shadow-[#fff]'
          >
            Manage Interview Slots
          </Link>
        </div>
      ) : null}

      <div className='mt-5 font-bold text-lg text-center'>
        {' '}
        If the calendar does not load properly, please reload the page. Sorry
        for the inconvenience.
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
    </>
  ) : null;
}

export default Calendar;
