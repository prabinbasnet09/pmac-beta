import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LandingHeader = () => {
  const [nav, setNav] = useState(false);
  const router = useRouter();
  console.log(router.pathname);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogOut = () => {
    localStorage.clear();
    router.push('/home');
  };

  return (
    <div className='flex justify-between items-center h-10 max-w-full mx-auto px-4 text-[#3B0000] bg-white'>
      {/*Exchange ULM for ULM Logo*/}

      <Link href='/home' className='w-full text-3xl font-bold text-ulm_red'>
        ULM
      </Link>

      {router.pathname === '/recommendationForm' ? (
        <button
          className='bg-ulm_red w-[100px] rounded-md text-lg my-6 hover:shadow-black shadow-sm mx-auto font-bold px-2 text-white'
          onClick={() => handleLogOut()}
        >
          Logout
        </button>
      ) : (
        <>
          <ul className='hidden md:flex'>
            <li className='p-4'>
              <Link href='/home'>Home</Link>
            </li>
            <li className='p-4'>
              <Link href='/contact'>Contact</Link>
            </li>
            <li className='p-4'>
              <Link href='/about'>About</Link>
            </li>
          </ul>

          <Link href='/login'>
            <button className='bg-ulm_red w-[100px] rounded-md text-lg my-6 hover:shadow-black shadow-sm mx-auto font-bold px-2 text-white'>
              Login
            </button>
          </Link>

          {/*Burger Menu*/}
          <div onClick={handleNav} className='block md:hidden pl-4 text-black'>
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
          <div
            className={
              nav
                ? 'fixed left-0 top-0 w-[40%] h-full border-r z-40 border-stone-900 bg-[#ffffff] ease-in-out duration-500'
                : 'fixed left-[-100%] text-black'
            }
          >
            <h1 className='w-full text-3xl font-bold m-4'>ULM</h1>
            <ul className='uppercase p-4 border-b border-stone-900'>
              <li className='p-4 border-b border-stone-900'>Home</li>
              <li className='p-4 border-b border-stone-900'>Contact</li>
              <li className='p-4'>
                <Link href='/about'>
                  <p>About</p>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingHeader;
