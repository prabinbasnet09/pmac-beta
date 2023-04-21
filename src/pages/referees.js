import React, { useState, useContext } from 'react';
import { ActiveUser } from './_app';
export default function Referees() {
  const activeUser = useContext(ActiveUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [evaluators, setEvaluators] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const newEvaluator = {
      name: name,
      email: email,
      department: department,
    };
    setEvaluators([...evaluators, newEvaluator]);
  };

  return activeUser ? (
    <div className='mt-10 sm:mt-0'>
      <div className='mt-10 w-full md:mt-10'>
        <div className='overflow-hidden shadow sm:rounded-md'>
          <div className='border-2 border-[#7e7e7e] rounded-xl shadow-xl shadow-[#7092BE] shadow:opacity-20 w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
            <p>
              Arrange to have two faculty members familiar with you submit an
              evaluation of your behalf using the faculty evaluation forms.
              These evaluations need to be turned into the committee by the
              faculty member.
            </p>

            <p>
              Please Note: It is preferable to use faculty that are not on the
              Pre-Medical Advisory Committee. Also please do not use faculty
              that might write you an independent letter of recommendation for
              AMCAS/ CASPA, etc.{' '}
            </p>

            <p>
              These must be faculty members that you have had as instructors
              while at ULM.
            </p>

            <div className='w-fit bg-white text-red p-5 rounded-lg mx-auto my-10 shadow-lg'>
              <form onSubmit={e => handleSubmit(e)}>
                <div class='mb-6'>
                  <label
                    for='name'
                    class='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='John Doe'
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div class='mb-6'>
                  <label
                    for='email'
                    class='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='john@ulm.edu'
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class='mb-6'>
                  <label
                    for='text'
                    class='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Department
                  </label>
                  <input
                    type='text'
                    id='department'
                    class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    onChange={e => setDepartment(e.target.value)}
                    required
                  />
                </div>
                <div class='flex items-start'></div>
                <button
                  type='submit'
                  class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  disabled={evaluators.length >= 2}
                >
                  Submit
                </button>
              </form>
            </div>

            <div class='relative shadow-md sm:rounded-lg w-fit m-auto'>
              <table class='m-auto table-auto w-fit text-sm text-left text-red dark:text-gray-400'>
                <thead class='text-xs text-red uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' class='px-6 py-3'>
                      Faculty Name
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      Email
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {evaluators.map((evaluator, index) => {
                    return (
                      <tr
                        class='bg-white text-red border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                        key={index}
                      >
                        <th
                          scope='row'
                          class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          {evaluator.name}
                        </th>
                        <td class='px-6 py-4'>{evaluator.email}</td>
                        <td class='px-6 py-4'>{evaluator.department}</td>
                        <td class='px-6 py-4 text-right'>
                          <p
                            href='#'
                            class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                          >
                            Remove
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
