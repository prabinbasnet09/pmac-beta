import { useState, useContext } from 'react';
import Image from 'next/image';
import Logo from 'public/ulm_academic_maroon_white.png';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function FacultyApplicantsList(props) {
  const [selectedUser, setSelectedUser] = useState(false);
  const [applicants, setApplicants] = useState(props.users);
  const [content, setContent] = useState('');
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
    setContent(value);
  }

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
      },
      { label: 'Unofficial Transcript', state: user.transcript ? 2 : 0 },
      {
        label: 'Application Information Form',
        state: user.applicantForm
          ? user.applicantForm === 'Submitted'
            ? 2
            : 1
          : 0,
      },
      {
        label: 'Faculty Recommendation',
        state: user.facultyRecommendation
          ? user.facultyRecommendation.length === 2
            ? 2
            : 1
          : 0,
      },
      { label: 'Schedule', state: user.schedule ? 2 : 0 },
      {
        label: 'Personal Statement',
        state: user.personalStatement ? 2 : 0,
      },
      { label: 'Headshot', state: user.profilePicture ? 2 : 0 },
      { label: 'AMCAS Form', state: user.amcas ? 2 : 0 },
    ]);
  }

  const handleUserSelection = (e, user) => {
    e.preventDefault();
    setSelectedUser(user);
  };

  return (
    <div className='bg-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-2'>
      {/* applicants list */}
      <div className='bg-white p-3 rounded-lg w-auto shadow-sm shadow-white'>
        <div>
          <div className='p-3 mb-2 bg-[#681212] rounded-lg text-[#fff] text-lg font-bold text-center'>
            Assigned Applicants
          </div>
          {/* <div className='scrollbar-thin p-2'>
            {applicants.map(applicant => (
              <div
                key={applicant.id}
                className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                onClick={e => handleUserSelection(e, applicant)}
              >
                {applicant.name}
              </div>
            ))}
          </div> */}
        </div>

        <div>
          <div className='p-3 mt-10 mb-2 bg-[#681212] rounded-lg text-[#fff] text-lg font-bold text-center'>
            Unassigned Applicants
          </div>
          <div className='scrollbar-thin p-2'>
            {applicants.map(applicant => (
              <div
                key={applicant.id}
                className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e] active:bg-[#FDB913]'
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
              <Image
                src={Logo}
                alt='ULM Logo'
                width={50}
                height={50}
                className='rounded-lg mr-3'
              />
              <div className='ml-5'>
                <p className='text-lg font-medium'>{selectedUser.name}</p>
                <p className='text-gray-500 font-thin'>{selectedUser.email}</p>
              </div>
            </div>
            <div>
              <p className='mr-5 font-bold text-gray-500'>Status</p>
            </div>
          </div>

          {/* <!-- Notes --> */}
          <div className='mb-10 mt-10'>
            <div className='relative'>
              <QuillNoSSRWrapper
                theme='snow'
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleContentChange}
              />
              <button
                className='absolute top-0 right-0 px-3 py-1 font-bold text-xl text-black rounded-md'
                onClick={() => setShowPopover(true)}
              >
                &#x26F6;
              </button>
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
                <div
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
                          <span className='text-yellow'>In Progress</span>
                        </div>
                      ) : (
                        <div className='text-sm font-semi-bold'>
                          <span className='text-green'>View</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
                    Completed
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
                    Dr. Burton Ashworth - 2/12/2021
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
                    Not complete
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
            applicants that have been assigned to you for an interview. You can
            view their status by clicking on the applicant&apos;s name. Also,
            you can take <span>notes</span> for each of the assigned applicants
            from the text-editor that has been made available for your ease.
          </p>

          <p className=' font-light text-lg text-red text-justify mt-10'>
            <span className='font-semibold'>Unassigned applicants</span> are the
            applicants that have not been assigned to you for an interview.
          </p>
        </div>
      )}
    </div>
  );
}
