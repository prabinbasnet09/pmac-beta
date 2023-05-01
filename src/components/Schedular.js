import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

export default function Schedular(props) {
  const { user } = props;
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    console.log('here');
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

  return (
    <div className='h-full'>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          right: '',
          left: 'prev,next',
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
  );
}
