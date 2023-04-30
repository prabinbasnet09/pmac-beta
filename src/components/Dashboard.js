import { useState, useEffect, useContext } from 'react';
import Checklist from './widgets/Checklist';
import { ActiveUser } from '@/pages/_app';

export default function Dashboard() {
  const activeUser = useContext(ActiveUser);

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
      {!isSmallScreen && (
        <div className='flex items-center justify-center '>
          <div className='w-3/4 px-2 sm:px-0'>
            <div className={`${'nav-body'}`}>
              <div className='flex space-x-4'>
                {/* Display all the checklist */}
                {activeUser.group[0] === 'Student' ? (
                  <Checklist activeUser={activeUser} />
                ) : null}
                <div className='w-8/12 bg-[rgb(245,245,245)]  px-4 py-5 sm:p-6 rounded-md'>
                  <div className='h-fit'>
                    <div className='font-bold text-lg'>Calendar</div>
                  </div>
                </div>
              </div>

              {/* calendar */}
            </div>
          </div>
        </div>
      )}

      {isSmallScreen && (
        <div className='flex items-center justify-center'>
          <div className={`w-3/4 mt-20 ml-10 bg-gray rounded-lg `}>
            <div className='flex space-x-4'>
              {/* Display all the checklist */}
              {activeUser.group[0] === 'Student' ? (
                <Checklist activeUser={activeUser} />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  ) : null;
}
