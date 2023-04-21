import { useState, useEffect, useContext } from 'react';
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

const Checklist = ({ activeUser }) => {
  const [steps, setSteps] = useState([]);
  const [expandComplete, setExpandComplete] = useState(false);
  const [expandIncomplete, setExpandIncomplete] = useState(false);
  const [expandNotStarted, setExpandNotStarted] = useState(false);
  const [totalComplete, setTotalComplete] = useState(0);
  const [totalIncomplete, setTotalIncomplete] = useState(0);
  const [totalNotStarted, setTotalNotStarted] = useState(0);

  useEffect(() => {
    setSteps([
      {
        label: 'Application Release Form',
        state: activeUser.applicantReleaseForm
          ? activeUser.applicantReleaseForm === 'Submitted'
            ? 2
            : 1
          : 0,
      },
      { label: 'Unofficial Transcript', state: activeUser.transcript ? 2 : 0 },
      {
        label: 'Application Information Form',
        state: activeUser.applicantForm
          ? activeUser.applicantForm === 'Submitted'
            ? 2
            : 1
          : 0,
      },
      {
        label: 'Faculty Recommendation',
        state: activeUser.facultyRecommendation
          ? activeUser.facultyRecommendation.length === 2
            ? 2
            : 1
          : 0,
      },
      { label: 'Schedule', state: activeUser.schedule ? 2 : 0 },
      {
        label: 'Personal Statement',
        state: activeUser.personalStatement ? 2 : 0,
      },
      { label: 'Headshot', state: activeUser.profilePicture ? 2 : 0 },
      { label: 'AMCAS Form', state: activeUser.amcas ? 2 : 0 },
    ]);
  }, [activeUser]);

  return (
    <div className='w-full'>
      {activeUser && activeUser.group[0] === 'Student' ? (
        <ul className='w-12/12 space-y-4 bg-[rgb(245,245,245)]  px-4 py-5 sm:p-6 rounded-md'>
          <div
            className='bg-white rounded-xl p-4 shadow-xl cursor-pointer hover:bg-[rgb(226,226,226)] '
            onClick={e => {
              e.preventDefault();
              setExpandNotStarted(!expandNotStarted);
            }}
          >
            <div className='flex justify-between items-end '>
              <div className='font-bold text-lg '>Not Started</div>
              <div className='text-[rgb(143,141,141)] italic text-sm'>
                {steps.filter(step => step.state === 0).length} remaining...
              </div>
            </div>
            {expandNotStarted ? (
              <div className='mt-5'>
                {steps.map((step, index) =>
                  step.state === 0 ? (
                    <li
                      key={String(step.label)}
                      className=' p-4 my-2  hover:bg-[rgb(255,255,255)] shadow-lg rounded-3xl border-2 border-[black]'
                    >
                      <div className='flex justify-between items-center'>
                        <h3 className='justify-left text-lg font-medium'>
                          {step.label}
                        </h3>
                        <div className='flex items-center'>
                          <XMarkIcon className='w-6 h-6 fill-red' />
                        </div>
                      </div>
                    </li>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          <div
            className='bg-white rounded-xl p-4 shadow-xl cursor-pointer hover:bg-[rgb(226,226,226)] '
            onClick={e => {
              e.preventDefault();
              setExpandIncomplete(!expandIncomplete);
            }}
          >
            <div className='flex justify-between items-end'>
              <div className='font-bold text-lg'>Incomplete</div>
              <div className='text-[rgb(143,141,141)] italic text-sm'>
                {steps.filter(step => step.state === 1).length} on progress...
              </div>
            </div>
            {expandIncomplete ? (
              <div className='mt-5'>
                {steps.map((step, index) =>
                  step.state === 1 ? (
                    <li
                      key={String(step.label)}
                      className='p-4 my-3 hover:bg-[rgb(255,255,255)] shadow-xl rounded-3xl border-2 border-[black]'
                    >
                      <div className='flex justify-between items-center'>
                        <h3 className='justify-left text-lg font-medium'>
                          {step.label}
                        </h3>
                        {step.state === 1 && (
                          <div className='flex items-center'>
                            <ExclamationTriangleIcon className='w-6 h-6 fill-yellow-600' />
                          </div>
                        )}
                      </div>
                    </li>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          <div
            className='bg-white rounded-xl p-4 shadow-xl cursor-pointer hover:bg-[rgb(226,226,226)]'
            onClick={e => {
              e.preventDefault();
              setExpandComplete(prevState => !prevState);
            }}
          >
            <div className='flex justify-between items-end'>
              <div className='font-bold text-lg'>Completed</div>
              <div className='text-[rgb(143,141,141)] italic text-sm'>
                {steps.filter(step => step.state === 2).length} completed...
              </div>
            </div>
            {expandComplete ? (
              <div className='mt-5'>
                {steps.map((step, index) =>
                  step.state === 2 ? (
                    <li
                      key={String(step.label)}
                      className='p-4 my-3 hover:bg-[rgb(255,255,255)] shadow-xl rounded-3xl border-2 border-[black]'
                    >
                      <div className='flex justify-between items-center'>
                        <h3 className='justify-left text-lg font-medium'>
                          {step.label}
                        </h3>
                        {step.state === 2 && (
                          <div className='flex items-center'>
                            <p className='text-lg'>
                              <CheckCircleIcon className='w-6 h-6 fill-green' />
                            </p>
                          </div>
                        )}
                      </div>
                    </li>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
        </ul>
      ) : activeUser.group[0] === 'Faculty' ? (
        <div>
          <h1>Faculty</h1>
        </div>
      ) : activeUser.group[0] === 'ChairCommittee' ? (
        <div>
          <h1>ChairCommittee</h1>
        </div>
      ) : (
        <div>
          <h1>Admin</h1>
        </div>
      )}
    </div>
  );
};

export default Checklist;
