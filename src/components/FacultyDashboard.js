import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FacultyDashboard(props) {
  const { activeUser } = props;
  const [interviews, setInterviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(null);

  const dateUpdateSuccess = () =>
    toast('Due date updated!', {
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

  const dateUpdateError = () =>
    toast('Error updating due date!', {
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
    try {
      API.graphql({
        query: queries.getDueDate,
        variables: {
          dueDate: 'dueDate',
        },
      })
        .then(data => {
          setDate(JSON.parse(data.data.getDueDate.date));
        })
        .catch(err => {
          console.log('error fetching due date:', err);
        });
    } catch (err) {
      console.log('error fetching due date:', err);
    }
  }, []);

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

  const handleDateChange = newValue => {
    setValue(new Date(newValue));
  };

  const handleDateSubmit = async () => {
    //   try {
    //     await API.graphql({
    //       query: mutations.createDueDate,
    //       variables: {
    //         input: {
    //           dueDate: 'dueDate',
    //           date: JSON.stringify(new Date(value)),
    //         },
    //       },
    //     })
    //       .then(() => {
    //         alert('Due date updated!');
    //       })
    //       .catch(err => {
    //         console.log('error updating due date:', err);
    //       });
    //   } catch (err) {
    //     console.log('error updating due date:', err);
    //   }
    // };

    try {
      await API.graphql({
        query: mutations.updateDueDate,
        variables: {
          input: {
            dueDate: 'dueDate',
            date: JSON.stringify(new Date(value)),
          },
        },
      })
        .then(() => {
          setDate(new Date(value));
          dateUpdateSuccess();
        })
        .catch(err => {
          dateUpdateError();
          console.log('error updating due date:', err);
        });
    } catch (err) {
      console.log('error updating due date:', err);
    }
  };

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
                Current Due Date:{' '}
                {date ? new Date(date).toLocaleDateString() : null}
              </div>
              <div className='flex justify-center'>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={value} onChange={handleDateChange} />
                  </LocalizationProvider>
                </div>
              </div>
              <div className='flex justify-center my-10'>
                <div
                  className='px-5 py-2 rounded-lg text-lg bg-white shadow-sm shadow-red w-fit cursor-pointer'
                  onClick={e => {
                    e.preventDefault();
                    handleDateSubmit();
                  }}
                >
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
