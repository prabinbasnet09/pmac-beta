import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import parseISO from 'date-fns/parseISO';
import { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useRouter } from 'next/router';
import * as mutations from '@/graphql/mutations';
import * as queries from '@/graphql/queries';
import { API } from 'aws-amplify';
import { ActiveUser } from '@/pages/_app';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Compare(props) {
  const activeUser = useContext(ActiveUser);
  const [allEvents, setAllEvents] = useState([]);
  const [calendarOneEvents, setCalendarOneEvents] = useState([]);
  const [calendarTwoEvents, setCalendarTwoEvents] = useState([]);
  const [calendarThreeEvents, setCalendarThreeEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [scheduleList, setScheduleList] = useState([]); // [calendarOneEvents, calendarTwoEvents, calendarThreeEvents
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

  useEffect(() => {
    setScheduleList(props.schedules);
    setUsers(props.userList);
  }, [props.schedules]);

  console.log('users', users);

  //Function to create a unique random ID for the event
  const createEventId = () => {
    return Math.random().toString(36).substring(2);
  };

  //Function to find the available slots
  function findAvailableSlots(scheduleList) {
    console.log('calendars', scheduleList);
    const mergedEvents = scheduleList.flat().sort((a, b) => {
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
        for (let j = 0; j < scheduleList.length; j++) {
          const calendarEvents = scheduleList[j];
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
          const start = new Date(currentEvent.end);
          const end = new Date(nextEvent.start);
          const minTime = 7;
          const maxTime = 17;
          if (start.getHours() >= minTime && end.getHours() <= maxTime) {
            const freeSlot = {
              id: createEventId(),
              title: 'Available',
              start: new Date(currentEvent.end).toISOString(),
              end: new Date(nextEvent.start).toISOString(),
            };
            freeSlots.push(freeSlot);
          }
        }
      }
    }
    return freeSlots;
  }

  const availableSlots = findAvailableSlots(scheduleList);

  const updateAssignedApplicants = async (user, student, start, end) => {
    let assignedApplicants = [];
    console.log(user.assignedApplicants);
    if (user.id === activeUser.id) {
      assignedApplicants = user.assignedApplicants[0]
        ? JSON.parse(user.assignedApplicants)
        : [];
      console.log('ChairBefore', assignedApplicants);
    } else {
      assignedApplicants = user.assignedApplicants
        ? JSON.parse(user.assignedApplicants[0])
        : [];
    }

    const assignedApplicant = {
      userId: student.id,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    assignedApplicants.push(assignedApplicant);

    try {
      await API.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: user.id,
            assignedApplicants: JSON.stringify(assignedApplicants),
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.log('err', err);
        });
    } catch (err) {
      console.log({ err });
    }
  };

  const updateApplicantInterview = async (user, faculty, start, end) => {
    const interview = [
      {
        name: activeUser.name,
        start: start.toISOString(),
        end: end.toISOString(),
      },
      {
        name: faculty.name,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    ];

    try {
      await API.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: user.id,
            interview: JSON.stringify(interview),
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(res => {
          console.log('res', res);
          success('Interview Scheduled');
        })
        .catch(err => {
          console.log('err', err);
          error('Error Scheduling Interview');
        });
    } catch (err) {
      console.log({ err });
    }
  };

  const handleEventClick = e => {
    let confirm = window.confirm(
      'Are you sure you want to schedule this time slot?'
    );
    if (confirm) {
      const start = new Date(e.event.start);
      const end = new Date(e.event.end);
      const student = users.filter(user =>
        user.groups ? user.groups[0] === 'Student' : null
      )[0];
      const faculty = users.filter(user =>
        user.groups ? user.groups[0] === 'Faculty' : null
      )[0];

      users.map(user => {
        if (user.id === activeUser.id) {
          updateAssignedApplicants(user, student, start, end);
        } else if (user.groups[0] === 'Faculty') {
          updateAssignedApplicants(user, student, start, end);
        } else {
          updateApplicantInterview(user, faculty, start, end);
        }
      });
    } else {
      return;
    }
  };

  return activeUser ? (
    <div className='h-full'>
      <div style={{ zIndex: '999' }} className='bg-maroon-500'>
        {availableSlots ? (
          <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: '',
              right: '',
              center: 'title',
            }}
            // customButtons={{ addEventButton: { text: 'Add Event' } }}
            initialView='timeGridWeek'
            editable={false}
            selectable={false}
            weekends={false}
            events={availableSlots}
            eventColor='green'
            eventClick={handleEventClick}
            nowIndicator={true}
            selectMirror={true}
            selectLongPressDelay={1000}
            slotMinTime='07:00:00'
            slotMaxTime='17:00:00'
            allDaySlot={false}
            height='auto'
          />
        ) : null}
      </div>
    </div>
  ) : null;
}

export default Compare;
