import React, { useState, useContext } from 'react';
import Image from 'next/image';
import Logo from '/public/ulm_logo.png';
import HeadShot from '/public/headshot.webp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { ActiveUser } from '@/pages/_app';

const Header = user => {
  const activeUser = useContext(ActiveUser);
  const [currentUser, setCurrentUser] = useState(user.user);
  const router = useRouter();

  const [profileToggle, setProfileToggle] = useState(false);
  const [notificationsToggle, setNotificationsToggle] = useState(false);
  const handleToggle = () => {
    console.log('toggle');
    setProfileToggle(prevState => !prevState);
    setNotificationsToggle(false);
  };

  const handleSignOut = async () => {
    await Auth.signOut();
    localStorage.clear();
    router.push('/login');
  };

  return router.pathname !== '/login' &&
    router.pathname !== '/about' &&
    router.pathname !== '/contact' &&
    router.pathname !== '/home' ? (
    <div className='flex justify-between items-center h-15 max-w-full mx-auto px-4 text-[#3B0000] shadow-xl'>
      {/*Exchange ULM for ULM Logo*/}
      <Link href='/'>
        <h1 className='w-full text-3xl font-bold text-ulm_red'>ULM</h1>
      </Link>
      <div className='mt-2 mr-2'>
        {/*Login Button*/}
        <div className='flex justify-between'>
          <div className='mr-3'>
            <button
              type='button'
              className='text-sm rounded-full  focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
              onClick={() => handleToggle()}
            >
              <Image
                src={
                  activeUser.profilePicture
                    ? activeUser.profilePicture
                    : HeadShot
                }
                alt='Headshot'
                width={40}
                height={40}
                className='border border-spacing-10 border-[#3B0000] rounded-full'
              />
            </button>
          </div>
          <div className=''>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.1'
              stroke='currentColor'
              className='w-8 h-8 cursor-pointer'
              onClick={e => {
                e.preventDefault();
                setNotificationsToggle(prevState => !prevState);
                setProfileToggle(false);
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
              />
            </svg>
          </div>
        </div>

        {profileToggle ? (
          <div className='absolute top-15 right-16 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-[#840029]'>
            <div className='px-4 py-3 '>
              <span className='block text-sm text-gray-900 '>
                {currentUser.attributes.name}
              </span>
              <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                {currentUser.attributes.email}
              </span>
            </div>
            <hr className='width-full h-1 mx-auto bg-[#bbb] border-0 rounded-lg' />
            <ul className='py-2'>
              <li>
                <Link
                  href='/profile'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-[#c2c2c2] '
                >
                  Profile
                </Link>
              </li>
              <li>
                <p
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-[#c2c2c2] cursor-pointer'
                  onClick={() => handleSignOut()}
                >
                  Sign out
                </p>
              </li>
            </ul>
          </div>
        ) : null}

        {notificationsToggle ? (
          <div className='absolute top-15 right-5 z-10 mt-2 w-60  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-[#840029]'>
            <ul className='p-3 text-gray cursor-pointer'>
              <li className='hover:bg-gray-100'>
                You have no new notifications.
              </li>
            </ul>
            <hr className='width-full h-1 mx-full bg-[#bbb] border-0 rounded-lg' />
            <div
              className='py-1  text-center cursor-pointer dark:hover:bg-[#c2c2c2]'
              onClick={e => {
                e.preventDefault();
                setNotificationsToggle(false);
              }}
            >
              Clear All
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Header;
