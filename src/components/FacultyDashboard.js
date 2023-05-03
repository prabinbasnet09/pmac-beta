import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FacultyDashboard(props) {
  const { activeUser } = props;
  const [interviews, setInterviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = newValue => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };
  const customStyles = {
    wrapper: '',
    input: 'border-gray-400 rounded-md border h-10 w-full px-3',
    clearButton: 'text-sm text-gray-500',
    calendarWrapper: 'bg-white border-gray-400 border rounded-lg shadow-lg',
    calendarHeader: 'bg-gray-100 text-gray-700',
    calendarNavButton: 'text-gray-500 hover:text-gray-700',
    calendarDaysWrapper: 'grid grid-cols-7 gap-2 p-2',
    calendarDay: 'text-center text-gray-700 h-8 leading-8 rounded-full',
    calendarDayHover: 'hover:bg-gray-100',
    calendarDayActive: 'bg-gray-400 text-white',
    calendarDayInactive: 'text-gray-400',
    calendarDayDisabled: 'text-gray-200 cursor-not-allowed',
  };
  useEffect(() => {
    if (
      activeUser &&
      activeUser.assignedApplicants &&
      activeUser.assignedApplicants[0]
    ) {
      setInterviews(JSON.parse(activeUser.assignedApplicants));
    }
    setUsers(activeUser.users);
  }, [activeUser]);

  return (
    <div className='w-full rounded-lg h-auto '>
      <div className='grid md:grid-cols-2 gap-3 h-full'>
        <div className='text-red text-2xl p-5 bg-white h shadow-sm shadow-black rounded-lg'>
          <div className='text-2xl font-semibold'>Upcoming Interviews</div>
          <ul className='p-5 h-full'>
            {users
              .filter(user => {
                // Use the `some` method to check if the user has an associated interview
                return interviews.some(
                  interview => interview.userId === user.id
                );
              })
              .map((user, index) => {
                console.log(user);
                return (
                  <li key={index} className='py-1'>
                    &#8594; {user.name}
                    <span className='block ml-14 py-1'>
                      &#x2022;{' '}
                      {new Date(
                        JSON.parse(user.interview)[0].start
                      ).toLocaleDateString()}
                    </span>
                    <span className='block ml-14 py-1'>
                      &#x2022;{' '}
                      {new Date(
                        JSON.parse(user.interview)[0].start
                      ).toLocaleTimeString()}
                    </span>
                  </li>
                );
              })}
          </ul>
          {}
        </div>
        <div className='text-red text-2xl p-5 bg-white h shadow-sm shadow-black rounded-lg'>
          {activeUser.group[0] === 'Faculty' ? (
            <div>
              <div className='text-2xl font-semibold'>Things to do</div>
              <ul className='p-5 h-full'>
                <li className='py-1'>&#8594; Fill out schedule</li>
                <li className='py-1'>&#8594; Interview assigned applicants</li>
              </ul>
            </div>
          ) : activeUser.group[0] === 'ChairCommittee' ? (
            <div>
              <div className='text-2xl font-semibold'>
                Update Applications Due Date
              </div>
              <div className='text-xl my-10 text-center '>
                Current Due Date: 05/10/2023
              </div>
              <div className='flex justify-center'>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
                  </LocalizationProvider>
                </div>
              </div>
              <div className='flex justify-center my-10'>
                <div className='px-5 py-2 rounded-lg text-lg bg-white shadow-sm shadow-red w-fit'>
                  Change Due Date
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
