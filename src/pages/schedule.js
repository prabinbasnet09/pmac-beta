import React, { useState, useEffect, useContext } from 'react';
//import BigCalendar from '@/components/BigCalendar';
import Calendar from '@/components/Calendar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { ActiveUser } from './_app.js';

export default function Schedule() {
  const router = useRouter();
  const activeUser = useContext(ActiveUser);

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

  return activeUser && activeUser.group[0] === 'Faculty' ? (
    activeUser.verified ? (
      <div className='flex items-center justify-center'>
        <div className='w-3/4 px-2 sm:px-0'>
          <div className={`${'nav-body'}`}>
            <Calendar user={activeUser} />
          </div>
        </div>
      </div>
    ) : (
      <div className='flex items-center justify-center'>
        <div className={` sm:block hidden w-3/4 px-2 sm:px-0`}>
          <div className={` ${'nav-body'}`}>
            <div className='text-red text-2xl text-center'>
              Please wait until the administrator verifies your account.
            </div>
          </div>
          ;
        </div>
      </div>
    )
  ) : (
    <div className='flex items-center justify-center'>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          <Calendar user={activeUser} />
        </div>
      </div>
    </div>
  );
}
