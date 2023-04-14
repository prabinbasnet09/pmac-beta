<<<<<<< HEAD
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import ReactDatePicker from 'react-datepicker';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { ActiveUser } from '@/pages/_app';

const events = [
  {
    title: 'My Birthday',
    start: '2023-05-28',
    end: '2023-05-29',
  },
  {
    title: 'Graduation Day',
    start: '2023-05-17',
    end: '2023-05-17',
  },
  {
    title: 'Final Project Due',
    start: '2023-05-07T12:30:00',
    allDay: false,
  },
  {
    title: 'Pelican Cup Presentation',
    start: '2023-04-04',
    end: '2023-04-05',
  },
  {
    title: 'Spring Break',
    start: '2023-04-07',
    end: '2023-04-14',
  },
  {
    title: 'Operating System Exam',
    start: '2023-04-06',
    end: '2023-04-07',
  },
];

function Schedular() {
  const activeUser = useContext(ActiveUser);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => true)
        .catch(err => {
          console.log(err);
          setUser(null);
          router.push('/login');
        });
    };
    fetchUser();
  }, []);

  function renderEventContent(eventInfo) {
    var infoTitle = window.prompt('What is the title of your event?');

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

  return activeUser ? (
    <div className='flex items-center justify-center'>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          <div
            style={{ position: 'relative', zIndex: '999' }}
            className='bg-maroon-500'
          >
            <FullCalendar
              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              headerToolbar={{
                right: 'addEventButton',
              }}
              customButtons={{ addEventButton: { text: 'Add Event' } }}
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
              select={info => renderEventContent(info)}
              selectLongPressDelay={1000}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Schedular;
=======
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from 'react';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2023,2 , 0),
        end: new Date(2023, 2, 0)
    },
    {
        title: "Vacation",
        allDay: true,
        start: new Date(2023,2 , 0),
        end: new Date(2023, 2, 0)
    },
    {
        title: "Conference",
        allDay: true,
        start: new Date(2023,2 , 0),
        end: new Date(2023, 2, 0)
    },
]

function Schedular() {

    const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''});
    const [allEvents, setAllEvents ] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-3/4 px-2 sm:px-0">
                <div className={`${"nav-body"}`}>  
                    <h1>Calendar</h1>
                    <h2>Add New Event</h2>
                    <div>
                        <input type='text' placeholder='Add Title' style={{width: '20%', marginRight: '10px'}}
                        value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        />
                        <ReactDatePicker placeholderText="Start Date" style={{marginRight: "10px"}}
                        selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
                        <ReactDatePicker placeholderText="End Date" 
                        selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
                    </div>
                    <Calendar localizer={localizer} events={events} 
                    startAccessor='start' endAccessor='end' style={{height: 500, margin: '50px'}} />
                    <button style={{marginTop: '10px'}} onClick={handleAddEvent}>Add Event</button>
                </div>
            </div>
        </div>

    );
}

export default Schedular;
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
