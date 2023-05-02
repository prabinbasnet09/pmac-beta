import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

export default function Schedular(props) {
  const user = props.user;
  const [allEvents, setAllEvents] = useState([]);

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
  }, []);

  useEffect(() => {
    if (user && user.schedule && user.schedule[0]) {
      try {
        setAllEvents(JSON.parse(user.schedule));
      } catch (error) {
        console.log(user.schedule);
      }
    } else {
      setAllEvents([]);
    }
  }, [user]);

  return user ? (
    <div className='h-full'>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          right: '',
          left: '',
          center: 'title',
        }}
        // customButtons={{ addEventButton: { text: 'Add Event' } }}
        initialView='timeGridWeek'
        editable={false}
        selectable={false}
        weekends={false}
        events={allEvents}
        eventColor='maroon'
        nowIndicator={true}
        selectMirror={true}
        slotMinTime='07:00:00'
        slotMaxTime='18:00:00'
        allDaySlot={false}
        height='auto'
      />
    </div>
  ) : (
    <div className='mt-10'>
      <div className=' font-semibold text-2xl text-red text-center '>
        Please select one of the users from any categories to view their{' '}
        <span className='underline italic'>schedule</span>. To view your
        schedule click on{' '}
        <span className='underline ml-1 italic'>My calendar</span>. To match
        schedules navigate to the above table.
      </div>
    </div>
  );
}
