import { useState, useEffect, useContext } from 'react';
import { ActiveUser } from './_app';
import Schedular from '@/components/Schedular';
import { useRouter } from 'next/router';

export default function ApplicantSchedule() {
  const activeUser = useContext(ActiveUser);
  const router = useRouter();
  const { user } = router.query;
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    if (user) {
      setSelectedApplicant(
        activeUser.users.filter(applicant => {
          return applicant.id === user;
        })[0]
      );
    }
  }, [user]);
  console.log(selectedApplicant);
  return (
    <div className='m-10 p-5 bg-[#F5F5F5] rounded-lg shadow-sm shadow-black'>
      {selectedApplicant ? (
        <div>
          <Schedular user={selectedApplicant} />
        </div>
      ) : null}
    </div>
  );
}
