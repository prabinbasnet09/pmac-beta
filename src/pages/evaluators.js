import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function Evaluators() {
  const router = useRouter();
  const { user } = router.query;
  const [selectedUser, setSelectedUser] = useState(null);
  const [evaluators, setEvaluators] = useState(null);

  useEffect(() => {
    const getLocalStorage = key => {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;

      if (new Date() >= new Date(item.expiresAt)) {
        localStorage.removeItem(key);
        return null;
      }
      return item;
    };

    const fetchUser = () => {
      const users = getLocalStorage('userInfo').value;
      return users.find(userInfo => userInfo.id === user);
    };
    user && getLocalStorage('userInfo') && setSelectedUser(fetchUser());
  }, []);

  useEffect(() => {
    selectedUser && console.log(selectedUser.evaluators);
    selectedUser && setEvaluators(JSON.parse(selectedUser.evaluators));
  }, [selectedUser]);

  return selectedUser ? (
    <div>
      <p className='text-center text-4xl text-[#8a1b1b] font-bold mt-16 ml-5'>
        Assigned Evaluators
      </p>
      <div className='p-5'>
        <div className='mt-8 bg-slate-200 scrollbar-thin overflow-x-scroll rounded-md'>
          <table className='w-full m-0'>
            <thead className='bg-[#8a1b1b] text-white p-0'>
              <tr>
                <th className='py-2 text-lg font-bold border-b border-slate-300'>
                  Name
                </th>
                <th className='py-2 text-lg font-bold border-b border-slate-300'>
                  Email
                </th>
                <th className='py-2 text-lg font-bold border-b border-slate-300'>
                  Department
                </th>
                <th className='py-2 text-lg font-bold border-b border-slate-300'>
                  Status
                </th>
                <th className='py-2 text-lg font-bold border-b border-slate-300'>
                  Action
                </th>
              </tr>
            </thead>
            {evaluators ? (
              <tbody className='text-center font-md'>
                {evaluators.map((evaluator, index) => (
                  <tr key={index} className=''>
                    <td className='py-2 px-3 border-b border-slate-300'>
                      {evaluator.name}
                    </td>
                    <td className='py-2 px-3 border-b border-slate-300'>
                      {evaluator.email}
                    </td>
                    <td className='py-2 px-3 border-b border-slate-300'>
                      {evaluator.department}
                    </td>
                    <td className='py-2 px-3 border-b border-slate-300'>
                      {console.log(selectedUser.id, selectedUser.facultyEmail)}
                      {selectedUser.facultyRecommendation.find(
                        email => email === evaluator.email
                      ) ? (
                        <span className='text-green'>Complete</span>
                      ) : (
                        <span className='text-[#e10000ce]'>Incomplete</span>
                      )}
                    </td>
                    <td className='py-2 px-3 border-b border-slate-300'>
                      <Link
                        href={`/applications/facultyRecForm/?user=${encodeURIComponent(
                          selectedUser.id
                        )}&facultyEmail=${encodeURIComponent(evaluator.email)}`}
                      >
                        <button className='bg-orange rounded-md px-4 py-1'>
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : null}
          </table>
        </div>
        {!evaluators && (
          <div className='text-center mt-10 text-2xl'>
            The user has not assigned any evaluators yet.
          </div>
        )}
      </div>
    </div>
  ) : null;
}
