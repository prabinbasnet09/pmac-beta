import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { ActiveUser } from './_app';
import { Auth, API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import Schedular from '@/components/Schedular';

export default function Slots() {
  const router = useRouter();
  const activeUser = useContext(ActiveUser);
  const [applicants, setApplicants] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

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
    activeUser &&
      setSelectedUser(
        activeUser.users.find(user => user.username === 'basnetpr')
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

  return (
    <div className='m-10 p-5 bg-[#F5F5F5] rounded-lg shadow-sm shadow-black'>
      <div class='flex flex-wrap justify-center gap-10 mx-5'>
        <div class='scrollbar-thin overflow-auto bg-white rounded-lg shadow-md shadow-black w-full '>
          {/* Committee Members */}

          <div className='p-3 text-center text-2xl text-red font-bold'>
            Committee Members
          </div>
          <div className='flex justify-evenly  dark:text-gray-400 py-2 '>
            <div className='text-lg font-semibold flex flex-col px-3'>
              3 Assigned
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
            <div className='text-lg font-semibold flex flex-col px-3'>
              2 Assigned
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
            <div className='text-lg font-semibold flex flex-col px-3'>
              1 Assigned
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
            <div className='text-lg font-semibold flex flex-col px-3'>
              Unassigned
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

        {/* Applicants */}
        <div class='scrollbar-thin overflow-x-scroll bg-white rounded-lg shadow-md shadow-black w-full'>
          <div className='p-3 text-center text-xl text-red font-bold'>
            Applicants
          </div>
          <div className='flex justify-evenly text-sm text-left text-gray-500 dark:text-gray-400'>
            <div scope='col' class='px-6 py-3'>
              Assigned
            </div>
            <div scope='col' class='px-6 py-3'>
              Unassigned
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#F8F8FF] rounded-lg grid grid-cols-1 md:grid-cols-4 gap-2  mt-10 mx-5 '>
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
    </div>
  );
}
