import React, { useState, useEffect } from 'react';
import BigCalendar from '@/components/BigCalendar';
import Calendar from '@/components/Calendar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Schedule() {
  const router = useRouter();

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
  }, [router.pathname]);
  return (
    <div className='flex items-center justify-center'>
      <div className='w-3/4 px-2 sm:px-0'>
        <div className={`${'nav-body'}`}>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
