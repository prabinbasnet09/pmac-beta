import { useState, useEffect, useContext } from 'react';
import Checklist from './Checklist';
import { ActiveUser } from '@/pages/_app';

export default function Dashboard() {
  const activeUser = useContext(ActiveUser);
  return (
    <div className='flex items-center justify-center'>
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
  );
}
