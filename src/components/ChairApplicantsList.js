import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from 'public/ulm_academic_maroon_white.png';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as mutations from '@/graphql/mutations';
import * as queries from '@/graphql/queries';
import { API } from 'aws-amplify';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function ChairApplicantsList(props) {
  const [applicants, setApplicants] = useState(
    props.users.filter(user => user.groups[0] === 'Student')
  );
  const activeUser = props.activeUser;
  const [selectedUser, setSelectedUser] = useState(null);
  const [complete, setComplete] = useState(false);
  const [notes, setNotes] = useState(null);
  const [createNote, setCreateNote] = useState(true);

  const [committeeMembers, setCommitteeMembers] = useState(
    props.users.filter(user => user.groups[0] === 'Faculty')
  );

  const [selectedGroup, setSelectedGroup] = useState('Committee Members');
  const [toggle, setToggle] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [steps, setSteps] = useState([]);

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  function handleContentChange(value) {
    setNotes(value);
  }

  const handleToggleChange = e => {
    console.log('toggle', toggle);
    e.preventDefault();
    setToggle(prevState => !prevState);
  };

  function setChecklist(user) {
    setSteps([
      {
        label: 'Application Release Form',
        state: user.applicantReleaseForm
          ? user.applicantReleaseForm === 'Submitted'
            ? 2
            : 1
          : 0,
        path: `/applications/applicant-release/?user=${encodeURIComponent(
          user.id
        )}`,
      },
      {
        label: 'Unofficial Transcript',
        state: user.transcript ? 2 : 0,
        path: user.transcript,
      },
      {
        label: 'Application Information Form',
        state: user.applicantForm
          ? user.applicantForm === 'Submitted'
            ? 2
            : 1
          : 0,
        path: `/applications/applicant-information/?user=${encodeURIComponent(
          user.id
        )}`,
      },
      {
        label: 'Faculty Recommendation',
        state: user.facultyRecommendation
          ? user.facultyRecommendation.length === 2
            ? 2
            : 1
          : 0,
        path: `/evaluators/?user=${encodeURIComponent(user.id)}`,
      },
      {
        label: 'Schedule',
        state: user.schedule ? 2 : 0,
        path: `/applicantSchedule?user=${encodeURIComponent(user.id)}`,
      },
      {
        label: 'Personal Statement',
        state: user.personalStatement ? 2 : 0,
        path: user.personalStatement,
      },
      {
        label: 'Headshot',
        state: user.profilePicture ? 2 : 0,
        path: user.profilePicture,
      },
      {
        label: 'AMCAS Form',
        state: user.amcas ? 2 : 0,
        path: user.amcas,
      },
    ]);
  }

  useEffect(() => {
    let count = 0;
    steps.forEach(step => {
      if (step.state === 2) {
        count++;
      }
    });
    if (count === steps.length) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [steps]);

  const handleUserSelection = user => {
    setSelectedUser(user);
    const fetchNotes = async () => {
      try {
        await API.graphql({
          query: queries.getFacultyNotes,
          variables: {
            facultyEmail: activeUser.email,
            userId: user.id,
          },
        }).then(response => {
          response.data.getFacultyNotes
            ? setNotes(response.data.getFacultyNotes.notes)
            : setNotes(null);
          // setNotes(response.data.getFaculty.notes);
          response.data.getFacultyNotes
            ? setCreateNote(false)
            : setCreateNote(true);
        });
      } catch (error) {
        console.log('error on fetching notes', error);
      }
    };
    fetchNotes();
  };

  const createNotes = async () => {
    try {
      await API.graphql({
        query: mutations.createFacultyNotes,
        variables: {
          input: {
            facultyEmail: activeUser.email,
            userId: selectedUser.id,
            notes: notes,
          },
        },
      })
        .then(response => {
          console.log('response from creating notes', response);
        })
        .catch(error => {
          console.log('error on creating notes', error);
        });
    } catch (error) {
      console.log('error on creating notes', error);
    }
  };

  const saveNotes = async () => {
    try {
      await API.graphql({
        query: mutations.updateFacultyNotes,
        variables: {
          input: {
            facultyEmail: activeUser.email,
            userId: selectedUser.id,
            notes: notes,
          },
        },
      })
        .then(response => {
          console.log('response from saving notes', response);
        })
        .catch(error => {
          console.log('error on saving notes', error);
        });
    } catch (error) {
      console.log('error on saving notes', error);
    }
  };

  return (
    <div className='bg-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-2'>
      {/* applicants list */}
      <div className='bg-white p-3 rounded-lg w-auto shadow-sm shadow-white'>
        <div className='text-center'>
          <button
            className='p-3 mb-2  bg-[#681212] w-full rounded-lg text-[#fff] text-lg font-bold  focus:ring-[#FDB913] inline-flex items-center justify-center dark:bg-[#681212] dark:hover:bg-[#630707] '
            type='button'
            onClick={e => handleToggleChange(e)}
          >
            {selectedGroup}
            <svg
              className='w-4 h-4 mx-2 mt-2'
              aria-hidden='true'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              ></path>
            </svg>
          </button>
          {toggle ? (
            <div className='relative'>
              <div className=' absolute top-15 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 '>
                <ul className='py-2 text-lg text-white cursor-pointer '>
                  <li>
                    <span
                      className='block px-4 py-2 text-[#840029] hover:bg-[#e4e4e4]  hover:text-[#FDB913]'
                      onClick={e => {
                        e.preventDefault();
                        setSelectedGroup('Committee Members');
                        setToggle(false);
                        setSelectedUser(null);
                      }}
                    >
                      Committee Members
                    </span>
                  </li>
                  <li>
                    <span
                      className='block px-4 py-2 text-[#840029] hover:bg-[#e4e4e4] hover:text-[#FDB913]'
                      onClick={e => {
                        e.preventDefault();
                        setSelectedGroup('Applicants');
                        setToggle(false);
                        setSelectedUser(null);
                      }}
                    >
                      Applicants
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <div className='relative mb-4 '>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full p-4 pl-10 text-sm text-black rounded-lg bg-[#e4e4e4]  focus:ring-[#681212] focus:border-[#681212] '
            placeholder='Search Users...'
            required
          />
        </div>
        {selectedGroup === 'Committee Members' ? (
          <div className=' cursor-pointer'>
            {committeeMembers.map(member => (
              <div
                key={member.id}
                className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                onClick={e => {
                  e.preventDefault();
                  handleUserSelection(member);
                }}
              >
                {member.name}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div>
              <div className='p-3 mb-2 bg-[#681212] rounded-lg text-[#fff] text-lg font-bold text-center'>
                Assigned Applicants
              </div>
              <div className='scrollbar-thin p-2'>
                {applicants
                  .filter(applicant => {
                    const user = JSON.parse(
                      activeUser.assignedApplicants[0]
                    ).filter(assigned => assigned.userId === applicant.id);
                    return user.length > 0 ? user : null;
                  })
                  .map(applicant => (
                    <div
                      key={applicant.id}
                      className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                      onClick={e => {
                        handleUserSelection(applicant);
                        setChecklist(applicant);
                      }}
                    >
                      {applicant.name}
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div className='p-3 mt-10 mb-2 bg-[#681212] rounded-lg text-[#fff] text-lg font-bold text-center'>
                Unassigned Applicants
              </div>
              <div className=' overflow-y-scroll scrollbar-thin  p-2'>
                {applicants
                  .filter(applicant => {
                    const user = JSON.parse(
                      activeUser.assignedApplicants[0]
                    ).filter(assigned => assigned.userId !== applicant.id);
                    return user.length > 0 ? user : null;
                  })
                  .map(applicant => (
                    <div
                      key={applicant.id}
                      className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                      onClick={e => {
                        handleUserSelection(applicant);
                        setChecklist(applicant);
                      }}
                    >
                      {applicant.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedGroup === 'Applicants' && selectedUser ? (
        <div className='bg-white p-5 rounded-lg md:col-span-3 shadow-sm shadow-white'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <Image
                src={Logo}
                alt='ULM Logo'
                width={50}
                height={50}
                className='rounded-lg '
              />
              <div className='ml-5'>
                <p className='text-lg font-medium'>{selectedUser.name}</p>
                <p className='text-gray-500 font-thin'>{selectedUser.email}</p>
              </div>
            </div>
            <div>
              <button className='mr-2 px-2 py-1 font-bold text-gray-500 rounded-md shadow-sm shadow-black hover:shadow-red'>
                Notify
              </button>
            </div>
          </div>

          {/* <!-- Notes --> */}
          <div className='mb-10 mt-10'>
            <div className='relative'>
              <QuillNoSSRWrapper
                theme='snow'
                modules={modules}
                formats={formats}
                value={notes ? notes : ''}
                onChange={handleContentChange}
              />
              {!createNote ? (
                <button
                  className='absolute top-2 right-2 px-2 py-1 font-bold text-xs text-black rounded-md bg-[#fff] shadow-sm shadow-black hover:shadow-red'
                  onClick={e => {
                    e.preventDefault();
                    saveNotes();
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className='absolute top-2 right-2 px-2 py-1 font-bold text-xs text-black rounded-md bg-[#fff] shadow-sm shadow-black hover:shadow-red'
                  onClick={e => {
                    e.preventDefault();
                    createNotes();
                  }}
                >
                  Save
                </button>
              )}
              <div className='text-red mt-2 ml-1 font-md'>
                Note: Please click the save button to save your notes.
              </div>
            </div>
            {showPopover && (
              <div className='popover'>
                <QuillNoSSRWrapper
                  theme='snow'
                  modules={modules}
                  formats={formats}
                  value={content}
                  onChange={handleContentChange}
                />
              </div>
            )}
          </div>

          {/* <!-- Students Checklist --> */}
          <div className='flex flex-wrap -mx-2'>
            {steps.map((step, index) => {
              return (
                <Link
                  href={`${step.path}`}
                  target='_blank'
                  key={index}
                  className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4'
                >
                  <div className='bg-[#e4e4e4] rounded-lg p-4 mb-2 text-[#840029] cursor-pointer hover:bg-[#d8d8d8]'>
                    <div className='flex flex-row justify-between '>
                      <div className='text-lg font-medium text-gray-500'>
                        {step.label}
                      </div>
                      {/* <div className='text-lg font-medium'>{step.state}</div> */}
                      {step.state === 0 ? (
                        <div className='text-sm font-semi-bold'>
                          <span className='text-[#FF0000] '>Not Started</span>
                        </div>
                      ) : step.state === 1 ? (
                        <div className='text-sm font-semi-bold'>
                          <span className='text-black'>In Progress</span>
                        </div>
                      ) : (
                        <div className='text-sm font-semi-bold'>
                          <span className='text-green'>View</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* timeline */}
          <div className='mt-5 ml-10 flex justify-center'>
            <ol className='sm:flex'>
              <li className='relative mb-6 sm:mb-0'>
                <div className='flex items-center'>
                  <div className='z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-[#840029] sm:ring-8 dark:ring-gray-900 shrink-0'>
                    <svg
                      aria-hidden='true'
                      className='w-3 h-3 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </div>
                  <div className='hidden sm:flex w-full h-0.5 dark:bg-[#840029]'></div>
                </div>

                <div className='mt-3 sm:pr-8'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-[#840029]'>
                    Application Process
                  </h3>
                  <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                    {complete ? 'Complete' : 'Incomplete'}
                  </p>
                </div>
              </li>
              <li className='relative mb-6 sm:mb-0'>
                <div className='flex items-center'>
                  <div className='z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-[#840029] sm:ring-8 dark:ring-gray-900 shrink-0'>
                    <svg
                      aria-hidden='true'
                      className='w-3 h-3 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </div>
                  <div className='hidden sm:flex w-full h-0.5 dark:bg-[#840029]'></div>
                </div>
                <div className='mt-3 sm:pr-8'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-[#840029]'>
                    Interview Process
                  </h3>
                  <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                    {complete ? 'Complete' : 'Incomplete'}
                  </p>
                </div>
              </li>
              <li className='relative mb-6 sm:mb-0'>
                <div className='flex items-center'>
                  <div className='z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-[#840029] sm:ring-8 dark:ring-gray-900 shrink-0'>
                    <svg
                      aria-hidden='true'
                      className='w-3 h-3 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className='mt-3 sm:pr-8'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-[#840029]'>
                    Offer
                  </h3>
                  <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                    {complete ? 'Complete' : 'Incomplete'}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      ) : selectedGroup === 'Committee Members' && selectedUser ? (
        <div className='bg-white p-5 rounded-lg md:col-span-3 shadow-sm shadow-white'>
          <div className='flex items-center justify-between  mb-4 bg-[#e4e4e4] p-5 rounded-xl'>
            <div className='flex items-center '>
              <Image
                src={
                  selectedUser.profilePicture
                    ? selectedUser.profilePicture
                    : Logo
                }
                alt='ULM Logo'
                width={150}
                height={150}
                className='rounded-lg mr-3'
              />
              <div className='ml-5 '>
                <p className='text-xl font-medium'>{selectedUser.name}</p>
                <p className='text-lg text-gray-500 font-thin'>
                  {selectedUser.email}
                </p>
              </div>
            </div>
          </div>

          <div className=' bg-[#e4e4e4] w-full p-5 rounded-xl'>
            <div className='p-5 text-2xl font-bold mb-5 text-red'>
              Applicants Assigned
            </div>
            <div className='flex flex-wrap gap-4 justify-evenly items-center text-center '>
              {applicants
                .filter(applicant => {
                  const user = JSON.parse(
                    selectedUser.assignedApplicants[0]
                  ).filter(assigned => assigned.userId === applicant.id);
                  return user.length > 0 ? user : null;
                })
                .map(applicant => {
                  const date = new Date(
                    JSON.parse(applicant.interview)[0].start
                  ).toLocaleDateString();
                  const time = new Date(
                    JSON.parse(applicant.interview)[0].start
                  ).toLocaleTimeString();
                  const complete = Date.now() > date;
                  console.log(complete);
                  return (
                    <div className='bg-white p-3 rounded-xl'>
                      <Image
                        src={
                          applicant.profilePicture
                            ? applicant.profilePicture
                            : Logo
                        }
                        alt='ULM Logo'
                        width={100}
                        height={100}
                        className='rounded-lg mx-auto py-5'
                      />
                      <div className='text-xl font-semibold mt-3'>
                        {applicant.name}
                      </div>
                      <div className='text-lg py-0.5'>{applicant.email}</div>
                      <div className='text-lg py-0.5'>
                        Scheduled on{' '}
                        <span className='font-semibold'>{date}</span> at{' '}
                        <span className='font-semibold'>{time}</span>
                      </div>
                      <div className='text-lg font-medium py-0.5'>
                        {complete ? (
                          <span className='text-green'>Complete</span>
                        ) : (
                          <span className='text-[#FF0000]'>Incomplete</span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div
          div
          className='bg-white p-5 rounded-lg md:col-span-3 shadow-sm shadow-white text-center'
        >
          <p className=' font-extralight'>Choose users to view their status</p>
        </div>
      )}
    </div>
  );
}
