import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { ActiveUser } from './_app';
import { Auth, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import Schedular from '@/components/Schedular';
import Compare from '@/components/Compare';

export default function Slots() {
  const router = useRouter();
  const activeUser = useContext(ActiveUser);
  const [applicants, setApplicants] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [chairCommittee, setChairCommittee] = useState();
  const [committeeOne, setCommitteeOne] = useState();
  const [committeeTwo, setCommitteeTwo] = useState();
  const [committeeThree, setCommitteeThree] = useState();
  const [applicant, setApplicant] = useState();
  const [compareUsers, setCompareUsers] = useState([]);
  const [toggleSchedules, setToggleSchedules] = useState(false);
  const [schedules, setSchedules] = useState([]);

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
    activeUser &&
      setApplicants(
        activeUser.users.filter(user => user.groups[0] === 'Student')
      );
    activeUser &&
      setCommitteeMembers(
        activeUser.users.filter(user => user.groups[0] === 'Faculty')
      );
  }, [activeUser]);

  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => true)
        .catch(err => {
          console.log(err);
          router.push('/login');
        });
    };
    fetchUser();
  }, [router]);

  const handleCompareSchedules = e => {
    const schedulesList = [
      chairCommittee ? JSON.parse(chairCommittee.schedule) : null,
      committeeOne ? JSON.parse(committeeOne.schedule) : null,
      committeeTwo ? JSON.parse(committeeTwo.schedule) : null,
      committeeThree ? JSON.parse(committeeThree.schedule) : null,
      applicant ? JSON.parse(applicant.schedule) : null,
    ];
    const userList = [
      chairCommittee ? chairCommittee : null,
      committeeOne ? committeeOne : null,
      committeeTwo ? committeeTwo : null,
      committeeThree ? committeeThree : null,
      applicant ? applicant : null,
    ];
    setCompareUsers(userList.filter(user => user !== null));
    setSchedules(schedulesList.filter(schedule => schedule !== null));
    setToggleSchedules(true);
  };

  console.log(schedules);

  return activeUser ? (
    <div className='m-10 p-5 bg-[#F5F5F5] rounded-lg shadow-sm shadow-black'>
      <div class='flex flex-wrap justify-center gap-10 mx-5'>
        <div class='scrollbar-thin overflow-auto bg-white rounded-lg shadow-md shadow-black w-full '>
          {/* Committee Members */}
          <div className='p-3 text-center text-2xl text-red font-bold'>
            Committee Members
          </div>
          <div className='flex flex-wrap justify-evenly  dark:text-gray-400 py-2 '>
            <div className='text-lg font-semibold flex flex-col px-3 py-3'>
              <div>3 Assigned</div>
              <div className='flex flex-col text-center'>
                {committeeMembers
                  .filter(member => {
                    const applicantsAssigned = member.assignedApplicants
                      ? member.assignedApplicants.length
                      : 0;
                    return applicantsAssigned === 3;
                  })
                  .map((member, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedUser(member)}
                        className='font-light'
                      >
                        {member.name}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className='text-lg font-semibold flex flex-col px-3 py-3'>
              <div>2 Assigned</div>
              <div className='flex flex-col text-center'>
                {committeeMembers
                  .filter(member => {
                    const applicantsAssigned = member.assignedApplicants
                      ? member.assignedApplicants.length
                      : 0;
                    return applicantsAssigned === 2;
                  })
                  .map((member, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedUser(member)}
                        className='font-light'
                      >
                        {member.name}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className='text-lg font-semibold flex flex-col px-3 py-3'>
              <div>1 Assigned</div>
              <div className='flex flex-col text-center'>
                {committeeMembers
                  .filter(member => {
                    const applicantsAssigned = member.assignedApplicants
                      ? member.assignedApplicants.length
                      : 0;
                    return applicantsAssigned === 1;
                  })
                  .map((member, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          onClick={() => setSelectedUser(member)}
                          className='font-light'
                        >
                          {member.name}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            <div className='text-lg font-semibold flex flex-col px-3 py-3'>
              <div>
                Unassigned
                <div className='flex flex-col text-center'>
                  {committeeMembers
                    .filter(member => {
                      const applicantsAssigned = member.assignedApplicants
                        ? member.assignedApplicants.length
                        : 0;
                      return applicantsAssigned === 0;
                    })
                    .map((member, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedUser(member)}
                          className='font-light'
                        >
                          {member.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants */}
        <div class='scrollbar-thin overflow-x-scroll bg-white rounded-lg shadow-md shadow-black w-full'>
          <div className='p-3 text-center text-2xl text-red font-bold'>
            Match Schedules
          </div>
          <div className='dark:text-gray-400 w-full'>
            <div className='flex flex-wrap justify-center m-2 px-10'>
              <div className='px-8 py-3'>
                <label
                  htmlFor='chairCommittee'
                  className='block mb-2 text-sm text-center font-medium text-gray-900 '
                >
                  Chair Committee
                </label>
                <select
                  id='chairCommittee'
                  className='bg-gray-50 px-5 py-3 mr-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={e => {
                    e.preventDefault();
                    console.log(e.target.value);
                    e.target.value !== 'None'
                      ? setChairCommittee(activeUser)
                      : setChairCommittee(null);
                  }}
                >
                  <option value={null}>None</option>
                  <option value={activeUser}>{activeUser.name}</option>
                </select>
              </div>
              <div className='px-8 py-3'>
                <label
                  htmlFor='committeeMember'
                  class='block mb-2 text-sm text-center font-medium text-gray-900 '
                >
                  Committe Member 1
                </label>
                <select
                  id='committeMemebrOne'
                  className='bg-gray-50 px-5 py-3 mr-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={e => {
                    e.preventDefault();
                    const selectedMember = committeeMembers.find(member => {
                      return member.name === e.target.value;
                    });
                    setCommitteeOne(selectedMember);
                  }}
                >
                  <option value={null}>Select a member</option>
                  {committeeMembers.map((member, index) => {
                    return (
                      <option key={index} value={member.name}>
                        {member.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='px-8 py-3'>
                <label
                  htmlFor='committeeMemberThree'
                  class='block mb-2 text-sm text-center font-medium text-gray-900 '
                >
                  Committe Member 2
                </label>
                <select
                  id='committeMemebrTwo'
                  className='bg-gray-50 px-5 py-3 mr-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={e => {
                    e.preventDefault();
                    const selectedMember = committeeMembers.find(member => {
                      return member.name === e.target.value;
                    });
                    setCommitteeTwo(selectedMember);
                  }}
                >
                  <option value={null}>Select a member</option>
                  {committeeMembers.map((member, index) => {
                    return (
                      <option key={index} value={member.name}>
                        {member.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='px-8 py-3'>
                <label
                  htmlFor='committeeMember'
                  class='block mb-2 text-sm text-center font-medium text-gray-900 '
                >
                  Committe Member 3
                </label>
                <select
                  id='committeMemebr'
                  className='bg-gray-50 px-5 py-3 mr-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={e => {
                    e.preventDefault();
                    const selectedMember = committeeMembers.find(member => {
                      return member.name === e.target.value;
                    });
                    setCommitteeThree(selectedMember);
                  }}
                >
                  <option value={null}>Select a member</option>
                  {committeeMembers.map((member, index) => {
                    return (
                      <option key={index} value={member.name}>
                        {member.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='px-8 py-3'>
                <label
                  htmlFor='applicant'
                  className='block mb-2 text-sm text-center font-medium text-gray-900 '
                >
                  Applicant
                </label>
                <select
                  id='applicant'
                  className='bg-gray-50 px-2 py-3 mr-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={e => {
                    e.preventDefault();
                    const selectedApplicant = applicants.find(applicant => {
                      return applicant.name === e.target.value;
                    });
                    setApplicant(selectedApplicant);
                  }}
                >
                  <option value={null}>Select an applicant</option>
                  {applicants.map((applicant, index) => {
                    return (
                      <option key={index} value={applicant.name}>
                        {applicant.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* <div className='m-2 shadow-md shadow-black px-20'>
              <div className='relative overflow-x-auto'>
                <div className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <div className='flex flex-wrap justify-around'>
                    <div scope='col' className='px-6 py-3 bg-red'>
                      <div>Committee Member</div>
                      <div className='flex flex-col text-center'>
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                      </div>
                    </div>
                    <div scope='col' className='px-6 py-3'>
                      <div>Applicants</div>
                      <div className='flex flex-col text-center'>
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                        <div>A</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class='border-b dark:bg-gray-800 dark:border-gray-700'>
                    <div
                      scope='row'
                      class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                    ></div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='flex justify-center'>
              <div
                className='mt-5 p-3 mb-5 bg-[#FDB913] text-center text-lg  text-red w-fit rounded-md hover:font-bold hover:shadow-md hover:shadow-[#fff] cursor-pointer'
                onClick={e => {
                  e.preventDefault();
                  handleCompareSchedules(e);
                }}
              >
                Compare Schedules
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#F8F8FF] rounded-lg grid grid-cols-1 md:grid-cols-4 gap-2  mt-10 mx-5 mb-5'>
        <div className='p-3 rounded-lg w-auto shadow-lg shadow-black'>
          {/* Committee Members */}
          <div
            className='p-3 mb-5 bg-[#ffb700] rounded-lg text-[#fff] text-lg font-bold text-center cursor-pointer'
            onClick={e => {
              e.preventDefault();
              setSelectedUser(activeUser);
            }}
          >
            My Calendar
          </div>
          <div className='bg-white p-3 mb-5 rounded-lg w-auto shadow-sm shadow-black'>
            <div className='p-3 mb-2 bg-[#681212] rounded-lg text-[#fff] text-lg font-bold text-center'>
              Committee Members
            </div>
            {committeeMembers.map((member, index) => {
              return (
                <div
                  key={index}
                  className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                  onClick={() => setSelectedUser(member)}
                >
                  {member.name}
                </div>
              );
            })}
          </div>
          {/* Applicants */}
          <div className='bg-[#fff] p-3 rounded-lg w-auto shadow-sm shadow-black'>
            <div>
              <div className='p-3 mb-2 bg-[#681212] rounded-lg text-[#fff] text-lg font-bold text-center'>
                Unscheduled Applicants
              </div>
              <div className='scrollbar-thin'>
                {/* Unassigned Applicants */}
                {applicants.map((applicant, index) => {
                  return (
                    <div
                      key={index}
                      className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                      onClick={() => setSelectedUser(applicant)}
                    >
                      {applicant.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='mt-5'>
              <div className='p-3 mb-2 bg-[#681212] rounded-lg text-[#fff] text-lg font-bold text-center'>
                Scheduled Applicants
              </div>
              <div className='scrollbar-thin'>
                {/* Assigned Applicants */}
                {applicants.map((applicant, index) => {
                  return (
                    <div
                      key={index}
                      className='mb-2 font-semibold bg-[#e4e4e4] rounded-lg p-3 text-[#840029] cursor-pointer hover:bg-[#9e9e9e]'
                      onClick={() => setSelectedUser(applicant)}
                    >
                      {applicant.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white p-5 rounded-lg md:col-span-3 shadow-lg shadow-black'>
          <Schedular user={selectedUser} />
        </div>
      </div>
      {console.log('schedules', schedules)}
      {toggleSchedules ? (
        <div>
          <div className='flex justify-center mt-20 text-4xl text-red font-semibold'>
            Available Schedules
          </div>
          <div className='bg-white mx-6 mt-5 p-5 mb-5 rounded-lg md:col-span-3 shadow-lg shadow-black'>
            <Compare schedules={schedules} userList={compareUsers} />
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
}
