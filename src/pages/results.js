<<<<<<< HEAD
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { ActiveUser } from './_app';

export default function Result() {
  const activeUser = useContext(ActiveUser);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => true)
        .catch(err => {
          console.log(err);
          setUser(null);
          router.push('/login');
        });
    };
    fetchUser();
  }, []);
  return activeUser ? (
    <div className='flex items-center justify-center'>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          <p>Results</p>
        </div>
      </div>
    </div>
  ) : null;
=======
import React from "react";
import Link from "next/link";

export default function Result() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-3/4 px-2 sm:px-0">
                <div className={`${"nav-body"}`}> 
                    <p>Results</p>
                </div>
            </div>
        </div>
    )
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
}
