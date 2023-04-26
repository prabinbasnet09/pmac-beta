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
          router.push('/login');
        });
    };
    fetchUser();
  }, [router]);

  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowSize.width < 700;

  return activeUser ? (
    <>
    <div className='flex items-center justify-center'>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          <div className='flex justify-center space-x-4'>
            <form
              className=' bg-white rounded-lg p-10 w-3/4 mx-5'
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <label
                htmlFor='Results'
                className='block mb-2 text-2xl font-bold text-gray-900 dark:text-black'
              >
                Please let us know about your results!
              </label>
              <p className='text-base'>
              After applying, please fill out a brief survey if accepted, to help us improve our services for future pre-med students.
              </p>
              <label className='block mt-10 mb-2 text-lg font-medium text-gray-900 dark:text-black'>
                1. Tell us which school(s) you got accepted to, if any.
              </label>
              <textarea
                rows='4'
                id='accepting_schools'
                className='block mb-2 text-sm text-gray-800 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 shadow-md w-full'
                placeholder='List the school(s) you got accepted to.'
              ></textarea>
              <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'>
                2. Which school did you decide to go to?
              </label>
              <textarea
                rows='4'
                id='school_of_choice'
                className='block mb-2 text-sm text-gray-800 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 shadow-md w-full'
                placeholder='Name the school you decided to attend.'
              ></textarea>
              <button
                type='submit'
                className='bg-green text-white font-bold py-2 px-4 rounded mt-3 mr-3 w-2/2'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div></>
    
  ) : null;
}
