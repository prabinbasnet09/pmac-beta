import React, { useState, useContext, useEffect } from 'react';
import { ActiveUser } from './_app';
import { API } from 'aws-amplify';
import { updateUser } from '../graphql/mutations';
import axios from 'axios';

export default function Referrals() {
  const activeUser = useContext(ActiveUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [evaluators, setEvaluators] = useState([]);

  useEffect(() => {
    activeUser &&
      activeUser.evaluators &&
      setEvaluators(JSON.parse(activeUser.evaluators));
  }, []);

  const handleAddEvaluator = async => {
    const newEvaluator = {
      name: name,
      email: email,
      department: department,
    };
    setEvaluators([...evaluators, newEvaluator]);
  };

  const handleRemoveEvaluator = async (e, email) => {
    e.preventDefault();
    const newEvaluators = evaluators.filter(
      evaluator => evaluator.email !== email
    );
    setEvaluators(newEvaluators);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: activeUser.id,
            evaluators: JSON.stringify(evaluators),
          },
        },
      })
        .then(res => {
          const backendURL =
            'https://99ym30ffli.execute-api.us-east-1.amazonaws.com/prod/register';
          const requestConfig = {
            headers: {
              'x-api-key': 'PBDYZzW59J6ZeQH6qDFGE3kd8BE34BFRavTb6Sez',
            },
          };
          const requestBody = {
            facultyEmail: evaluators[0].email,
            userId: activeUser.id,
          };
          axios
            .post(backendURL, requestBody, requestConfig)
            .then(response => true)
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(evaluators);

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
                <div className='mb-6'>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='John Doe'
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-black focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='john@ulm.edu'
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor='text'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Department
                  </label>
                  <input
                    type='text'
                    id='department'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-black focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    onChange={e => setDepartment(e.target.value)}
                    required
                  />
                </div>
                <div className='flex justify-center'>
                  <button
                    className='text-white bg-[#FDB913] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-red'
                    disabled={evaluators.length >= 2}
                    onClick={e => {
                      e.preventDefault();
                      handleAddEvaluator();
                    }}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>

            <div className='relative shadow-md sm:rounded-lg w-fit m-auto'>
              <table className='m-auto table-auto w-fit text-sm text-left text-red dark:text-gray-400'>
                <thead className='text-xs text-red uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Faculty Name
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Email
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {evaluators.map((evaluator, index) => {
                    return (
                      <tr
                        className='bg-white text-red border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                        key={index}
                      >
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-black '
                        >
                          {evaluator.name}
                        </th>
                        <td className='px-6 py-4 text-black'>
                          {evaluator.email}
                        </td>
                        <td className='px-6 py-4 text-black'>
                          {evaluator.department}
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <p
                            className='font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer'
                            onClick={e =>
                              handleRemoveEvaluator(e, evaluator.email)
                            }
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
            <div className='flex justify-center mt-10'>
              <button
                className='text-white text-md bg-[#FDB913] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center  dark:focus:ring-red'
                disabled={evaluators.length >= 2 || evaluators.length < 1}
                onClick={e => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
