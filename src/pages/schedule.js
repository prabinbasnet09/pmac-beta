import BigCalendar from '@/components/BigCalendar';
import Calendar from '@/components/Calendar';
import Link from 'next/link';

export default function Schedule() {
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
