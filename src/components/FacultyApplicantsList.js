import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Logo from 'public/ulm_academic_maroon_white.png';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import Results from '../components/Results';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function FacultyApplicantsList(props) {
  const { users, activeUser } = props;
  const [selectedUser, setSelectedUser] = useState(false);
  const [applicants, setApplicants] = useState(
    users.filter(
      user =>
        user.groups[0] !== 'Faculty' && user.groups[0] !== 'ChairCommittee'
    )
  );
  const [content, setContent] = useState('');
  const [steps, setSteps] = useState([]);
  const [assignedApplicants, setAssignedApplicants] = useState([]);
  const [complete, setComplete] = useState(false);
  const [notes, setNotes] = useState(null);
  const [createNote, setCreateNote] = useState(true);
  const [showResults, setShowResults] = useState(false);

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

  useEffect(() => {}, [notes]);

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

  function setChecklist(e, user) {
    e.preventDefault();
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
        state: user.amcasForm ? 2 : 0,
        path: user.amcasForm,
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

  function handleContentChange(value) {
    setNotes(value);
  }
  console.log(selectedUser);
  const handleUserSelection = (e, user) => {
    e.preventDefault();
    setSelectedUser(user);
    setShowResults(false);

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
          success('Notes saved successfully');
        })
        .catch(error => {
          console.log('error on creating notes', error);
          error('Error on saving notes');
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
          success('Notes saved successfully');
        })
        .catch(error => {
          console.log('error on saving notes', error);
          error('Error on saving notes');
        });
    } catch (error) {
      console.log('error on saving notes', error);
    }
  };

  const handlePopOver = () => {
    setShowResults(prevState => !prevState);
  };

  return (
    <div>
      <div className='bg-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-2'>
        {/* applicants list */}
        <div className='bg-white p-3 rounded-lg w-auto shadow-sm shadow-white'>
          <div>
            <div className='p-3 mb-2 bg-[#681212] rounded-lg text-[#fff] text-lg font-bold text-center'>
              Assigned Applicants
            </div>
            <div className='scrollbar-thin p-2'>
              {applicants
                .filter(applicant => {
                  const user =
                    activeUser.assignedApplicants &&
                    activeUser.assignedApplicants[0] &&
                    JSON.parse(activeUser.assignedApplicants[0]).filter(
                      assigned => assigned.userId === applicant.id
                    );
                  return user && user.length > 0 ? applicant : null;
                })
                .map(applicant => (
                  <div
                    key={applicant.id}
                    className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                    onClick={e => {
                      handleUserSelection(e, applicant);
                      setChecklist(e, applicant);
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
                  const assignedApplicants =
                    activeUser.assignedApplicants &&
                    JSON.parse(activeUser.assignedApplicants[0]);
                  const user =
                    !assignedApplicants ||
                    !assignedApplicants.some(
                      assigned => assigned.userId === applicant.id
                    );
                  return user ? applicant : null;
                })
                .map(applicant => (
                  <div
                    key={applicant.id}
                    className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                    onClick={e => {
                      handleUserSelection(e, applicant);
                      setChecklist(e, applicant);
                    }}
                  >
                    {applicant.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {selectedUser ? (
          <div className='bg-white p-5 rounded-lg md:col-span-3 shadow-sm shadow-white'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center'>
                <div className='hidden sm:block'>
                  <Image
                    src={Logo}
                    alt='ULM Logo'
                    width={50}
                    height={50}
                    className='rounded-lg mr-3'
                  />
                </div>
                <div className=' flex-col ml-5 '>
                  <p className='text-lg font-medium'>{selectedUser.name}</p>
                  <p className='text-gray-500 font-thin'>
                    {selectedUser.email}
                  </p>
                </div>
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
                  height='400px'
                />
                {!createNote ? (
                  <button
                    className='absolute top-2 right-2 px-3 py-1 font-bold text-sm text-black rounded-md bg-[#fff] shadow-sm shadow-black hover:shadow-red'
                    onClick={e => {
                      e.preventDefault();
                      saveNotes();
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className='absolute top-2 right-2 px-3 py-1 font-bold text-sm text-black rounded-md bg-[#fff] shadow-sm shadow-black hover:shadow-red'
                    onClick={e => {
                      e.preventDefault();
                      createNotes();
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
              <div className='text-red mt-2 ml-1 font-md'>
                Note: Please click the save button to save your notes.
              </div>
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
              <ol className='sm:flex  sm:gap-8 sm:px-10'>
                <li className='relative mb-6 sm:mb-0 md:px-2'>
                  <div className='flex items-center gap-5'>
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
                <li className='relative mb-6 sm:mb-0 md:px-2'>
                  <div className='flex items-center gap-5'>
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
                <li className='relative mb-6 sm:mb-0 md:px-2'>
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
                  <div className='mt-3 sm:pr-8 :'>
                    <p className='text-lg font-semibold text-gray-900 dark:text-[#840029]'>
                      Results/Offer
                    </p>
                    <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                      {selectedUser.results ? (
                        <div className='relative mt-1'>
                          <span class='absolute right-2 bottom-6 flex h-3 w-3'>
                            <span class='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#840029] opacity-75'></span>
                            <span class='relative inline-flex rounded-full h-3 w-3 bg-[#840029]'></span>
                          </span>
                          <button
                            className='bg-white font-semibold shadow-sm shadow-black hover:shadow-red rounded-md text-sm p-1 px-2'
                            onClick={e => {
                              e.preventDefault();
                              handlePopOver();
                            }}
                          >
                            {/* <span class='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span> */}
                            View Results
                          </button>
                        </div>
                      ) : (
                        'Incomplete'
                      )}
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <div className='bg-white p-5 rounded-lg md:col-span-3 shadow-sm shadow-white text-center'>
            <p className=' font-semibold text-2xl text-red'>
              Please choose applicants to view their status from the sidebar on
              your left.
            </p>

            <p className=' font-light text-lg text-red text-justify mt-10 '>
              <span className='font-semibold'>Assigned applicants</span> are the
              applicants that have been assigned to you for an interview. You
              can view their status by clicking on the applicant&apos;s name.
              Also, you can take <span>notes</span> for each of the assigned
              applicants from the text-editor that has been made available for
              your ease.
            </p>

            <p className=' font-light text-lg text-red text-justify mt-10'>
              <span className='font-semibold'>Unassigned applicants</span> are
              the applicants that have not been assigned to you for an
              interview.
            </p>
          </div>
        )}
      </div>
      {showResults ? (
        <div>
          <Results activeUser={selectedUser} />
        </div>
      ) : null}
    </div>
  );
}
