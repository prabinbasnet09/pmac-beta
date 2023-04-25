import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useState, useEffect } from 'react';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from '../styles/calendar.module.css';
const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export default function BigCalendar() {
  useEffect(() => {
    // Dynamically add the SASS styles to the head of the document
    const styleNode = document.createElement('style');
    styleNode.innerHTML = styles.toString();
    document.head.appendChild(styleNode);
    // Remove the style node when the component is unmounted
    return () => {
      document.head.removeChild(styleNode);
    };
  }, []);

  const [events, setEvents] = useState([
    {
      id: 0,
      title: 'Event 1',
      start: new Date('2023-04-24T09:00:00'),
      end: new Date('2023-04-24T10:30:00'),
    },
    {
      id: 1,
      title: 'Event 2',
      start: new Date('2023-04-24T11:00:00'),
      end: new Date('2023-04-24T12:30:00'),
    },
  ]);

  const today = new Date();

  const createEventId = () => {
    return String(events.length);
  };

  const handleSelectEvent = event => {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${event.title}?`
      )
    ) {
      const updatedEvents = events.filter(item => item.id !== event.id);
      setEvents(updatedEvents);
    }
  };

  const handleSelectSlot = slotInfo => {
    const { start, end } = slotInfo;
    let title = prompt('Please enter a new title for your event');
    if (title) {
      const newEvent = {
        id: createEventId(), // generate a unique ID for the event
        title: title,
        start,
        end,
        allDay: false,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventDrop = ({ event, start, end, isAllDay }) => {
    // handle event drop
    const updatedEvents = events.map(item =>
      item.id === event.id ? { ...item, start, end, isAllDay } : item
    );
    setEvents(updatedEvents);
  };

  const handleEventResize = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    const updatedEvents = events.map(item =>
      item.id === updatedEvent.id ? updatedEvent : item
    );
    setEvents(updatedEvents);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          <div className={styles.calendar}>
            <DnDCalendar
              selectable
              localizer={localizer}
              events={events}
              defaultView='week'
              views={['week']}
              min={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                  8
                )
              }
              max={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                  18
                )
              }
              showMultiDayTimes
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              onEventDrop={handleEventDrop}
              onEventResize={handleEventResize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
