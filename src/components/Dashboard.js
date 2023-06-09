import { useState, useEffect, useContext } from 'react';
import Checklist from './widgets/Checklist';
import { ActiveUser } from '@/pages/_app';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FacultyDashboard from './FacultyDashboard';
import AppUsers from './AppUsers';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const calendarEvents = [
  {
    id: '0',
    title: 'Unavailable',
    start: '2023-04-29',
    end: '2023-04-24',
  },
  {
    id: '1',
    title: 'Unavailable',
    start: '2023-04-26',
    end: '2023-04-26',
  },
  {
    id: '2',
    title: 'Unavailable',
    start: '2023-04-25',
    end: '2023-04-25',
  },
];

export default function Dashboard() {
  const activeUser = useContext(ActiveUser);

  const [windowSize, setWindowSize] = useState({ width: undefined });
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/fullcalendar-custom.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (activeUser && activeUser.interview) {
      setInterviews(JSON.parse(activeUser.interview));
    }
  }, [activeUser]);
  console.log(interviews);

  const isSmallScreen = windowSize.width < 700;

  const [eventDescription, setEventDescription] = useState(null);

  const handleEventMouseEnter = eventInfo => {
    console.log('working?');
    setEventDescription(eventInfo.event.title);
  };

  const handleEventMouseLeave = () => {
    console.log('how about this?');
    setEventDescription(null);
  };

  return activeUser ? (
    <>
      {!isSmallScreen && (
        <div className='flex items-center justify-center '>
          <div className='w-3/4 px-2 sm:px-0'>
            <div className={`${'nav-body'}`}>
              <div className='flex space-x-4'>
                {/* Display all the checklist */}
                {activeUser.group[0] === 'Student' ? (
                  <Checklist activeUser={activeUser} />
                ) : activeUser.group[0] === 'Faculty' ? (
                  <FacultyDashboard activeUser={activeUser} />
                ) : activeUser.group[0] === 'ChairCommittee' ? (
                  <FacultyDashboard activeUser={activeUser} />
                ) : activeUser.group[0] === 'Admin' ? (
                  <AppUsers activeUser={activeUser} />
                ) : null}
                {activeUser.group[0] === 'Student' ||
                activeUser.group[0] === 'Faculty' ||
                activeUser.group[0] === 'ChairCommittee' ? (
                  <div className='hidden sm:block  px-4 py-5 sm:p-6 rounded-md bg-white h shadow-sm shadow-black '>
                    <div className='flex justify-center '>
                      {/* <div className="font-bold text-lg">
                      Calendar */}

                      <div
                        style={{
                          width: '300px ',
                          height: '300px',
                          position: 'relative',
                        }}
                      >
                        <FullCalendar
                          plugins={[dayGridPlugin, interactionPlugin]}
                          initialView='dayGridMonth'
                          titleFormat={{
                            month: 'short',
                            day: 'numeric',
                          }}
                          aspectRatio={1}
                          height='100%'
                          events={
                            activeUser &&
                            activeUser.assignedApplicants &&
                            activeUser.assignedApplicants[0]
                              ? JSON.parse(activeUser.assignedApplicants)
                              : activeUser &&
                                activeUser.interview &&
                                activeUser.interview[0]
                              ? JSON.parse(activeUser.interview)
                              : calendarEvents
                          }
                          eventMouseEnter={handleEventMouseEnter}
                          eventMouseLeave={handleEventMouseLeave}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: '0',
                          }}
                          eventColor='#F87171'
                        />
                        {eventDescription && (
                          <div
                            style={{
                              position: 'relative',
                              backgroundPositionX: '15px',
                              backgroundPositionY: '15px',
                            }}
                          >
                            {eventDescription}
                          </div>
                        )}
                      </div>

                      {/* </div> */}
                    </div>
                  </div>
                ) : null}
              </div>
              <div>
                {activeUser.group[0] === 'Student' ? (
                  <div className='bg-white mt-5 p-5 rounded-lg'>
                    <div className='text-red font-bold text-2xl'>
                      Upcoming Interviews
                    </div>

                    {interviews.length > 0 ? (
                      <div className='flex flex-wrap justify-start gap-32 p-5 mt-5 ml-10'>
                        {interviews.map((interview, index) => {
                          const date = new Date(
                            interview.start
                          ).toLocaleDateString();
                          const time = new Date(
                            interview.start
                          ).toLocaleTimeString();
                          return (
                            <div
                              key={index}
                              className='bg-white p-5 shadow-md shadow-red rounded-lg text-center text-lg'
                            >
                              <div className='py-1 font-bold'>
                                {interview.name}
                              </div>
                              <div className='py-1'>
                                Scheduled on{' '}
                                <span className='font-bold'>{date}</span>
                              </div>
                              <div className='py-1'>
                                <span className='font-bold'>{time}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className='text-red text-xl mt-5'>
                        User has no upcoming interviews scheduled.
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {isSmallScreen && (
        <div className='flex items-center justify-center mb-10'>
          <div className={`w-3/4 mt-20 ml-5 rounded-lg`}>
            <div className='flex space-x-4'>
              {/* Display all the checklist */}
              {activeUser.group[0] === 'Student' ? (
                <Checklist activeUser={activeUser} />
              ) : activeUser.group[0] === 'Faculty' ? (
                <FacultyDashboard activeUser={activeUser} />
              ) : activeUser.group[0] === 'ChairCommittee' ? (
                <FacultyDashboard activeUser={activeUser} />
              ) : (
                <AppUsers />
              )}
            </div>
            {activeUser.group[0] === 'Student' ? (
              <div>
                <div className='text-red text-center font-semibold text-2xl mt-5'>
                  Upcoming Interviews
                </div>
                <div className='flex flex-wrap justify-center gap-5  mt-5'>
                  {interviews.map((interview, index) => {
                    const date = new Date(interview.start).toLocaleDateString();
                    const time = new Date(interview.start).toLocaleTimeString();
                    return (
                      <div
                        key={index}
                        className='bg-white p-5 shadow-md shadow-red rounded-lg text-center'
                      >
                        <div className='py-1 font-bold'>{interview.name}</div>
                        <div className='py-1'>
                          Scheduled on <span className='font-bold'>{date}</span>
                        </div>
                        <div className='py-1'>
                          {' '}
                          <span className='font-bold'>{time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='text-red text-center text-xl mt-5'>
                  User has no upcoming interviews scheduled.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  ) : null;
}
