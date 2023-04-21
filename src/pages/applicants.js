import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { ActiveUser } from './_app';
import { Auth } from 'aws-amplify';
import ChairApplicantsList from '../components/ChairApplicantsList';
import FacultyApplicantsList from '../components/FacultyApplicantsList';
import AppUsers from '@/components/AppUsers';

export default function Applicants() {
  const activeUser = useContext(ActiveUser);
  const [users, setUsers] = useState();
  const [groups, setGroups] = useState();

  const router = useRouter();
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
  }, []);

  useEffect(() => {
    activeUser && setUsers(activeUser.users);
    activeUser && setGroups(activeUser.group[0]);
  }, [activeUser]);

  return activeUser ? (
    <div className='flex items-center justify-center'>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          {groups && groups === 'ChairCommittee' ? (
            <ChairApplicantsList users={activeUser.users} />
          ) : groups && groups === 'Faculty' ? (
            <FacultyApplicantsList users={activeUser.users} />
          ) : groups && groups === 'Admin' ? (
            <AppUsers />
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
}
