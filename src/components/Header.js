import React, { useState, useContext } from 'react';
import Image from 'next/image';
import Logo from '/public/ulm_logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';

const Header = user => {
  const [activeUser, setActiveUser] = useState(user.user);
  const router = useRouter();

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    console.log('toggle');
    setToggle(prevState => !prevState);
  };

  const handleSignOut = async () => {
    await Auth.signOut();
    localStorage.clear();
    router.push('/login');
  };

  return router.pathname !== '/login' ? (
    <div className='flex justify-between items-center h-10 max-w-full mx-auto px-4 text-[#3B0000]'>
      {/*Exchange ULM for ULM Logo*/}
      <Link href='/'>
        <h1 className='w-full text-3xl font-bold text-ulm_red'>ULM</h1>
      </Link>
      <div className=' relative mt-10 mr-2 '>
        {/*Login Button*/}
        <button
          type='button'
          className='text-sm rounded-full  focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
          onClick={() => handleToggle()}
        >
          <Image
            src={Logo}
            alt='ULM Logo'
            width={60}
            height={60}
            className='border border-spacing-10 border-[#3B0000] rounded-full'
          />
        </button>
        {toggle ? (
          <div className='absolute top-15 right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-[#840029]'>
            <div className='px-4 py-3 '>
              <span className='block text-sm text-gray-900 '>
                {activeUser.attributes.name}
              </span>
              <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                {activeUser.attributes.email}
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
      </div>
    </div>
  ) : null;
};

export default Header;
