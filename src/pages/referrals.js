import React, { useState, useContext, useEffect } from 'react';
import { ActiveUser } from './_app';
import { API } from 'aws-amplify';
import { updateUser } from '../graphql/mutations';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Referrals() {
  const activeUser = useContext(ActiveUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [evaluators, setEvaluators] = useState([]);
  const [newEvaluators, setNewEvaluators] = useState([]);

  const success = msg =>
    toast(msg, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      style: {
        backgroundColor: '#4BB543',
      },
    });

  const error = error =>
    toast(error, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      style: {
        backgroundColor: '#FF0000',
      },
    });

  useEffect(() => {
    activeUser &&
      activeUser.evaluators &&
      setEvaluators(JSON.parse(activeUser.evaluators));
  }, []);

  const registerUser = async () => {
    const backendURL =
      'https://99ym30ffli.execute-api.us-east-1.amazonaws.com/prod/register';
    const requestConfig = {
      headers: {
        'x-api-key': 'PBDYZzW59J6ZeQH6qDFGE3kd8BE34BFRavTb6Sez',
      },
    };
    const requestBody =
      newEvaluators.length === 1
        ? {
            facultyEmail: newEvaluators[0].email,
            userId: activeUser.id,
          }
        : {
            facultyEmailOne: newEvaluators[0].email,
            userIdOne: activeUser.id,
            facultyEmailTwo: newEvaluators[1].email,
            userIdTwo: activeUser.id,
          };
    return axios
      .post(backendURL, requestBody, requestConfig)
      .then(response => {
        success('Evaluator(s) added successfully');
      })
      .catch(error => {
        error('Evaluator(s) already registered or error adding evaluator(s)');
        console.log(error);
      });
  };
  console.log(evaluators);

  const deleteUser = async email => {
    const backendURL =
      'https://99ym30ffli.execute-api.us-east-1.amazonaws.com/prod/delete';
    const requestConfig = {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
    };
    const requestBody = {
      facultyEmail: email,
      userId: activeUser.id,
    };
    return axios
      .post(backendURL, requestBody, requestConfig)
      .then(response => {
        success('User deleted successfully');
      })
      .catch(error => {
        error('Error deleting user');
        console.log(error);
      });
  };

  const handleAddEvaluator = async => {
    const newEvaluator = {
      name: name,
      email: email,
      department: department,
    };
    setEvaluators([...evaluators, newEvaluator]);
    setNewEvaluators([...newEvaluators, newEvaluator]);
  };

  const handleRemoveEvaluator = async (e, email) => {
    e.preventDefault();
    const newEvaluators = evaluators.filter(
      evaluator => evaluator.email !== email
    );
    setEvaluators(newEvaluators);
    setNewEvaluators(newEvaluators);
    deleteUser(email);
  };

  const sendEmail = async (email, name) => {
    const params = {
      receiver: email,
      facultyEmail: email,
      facultyName: name,
      name: `${activeUser.name}`,
      userId: activeUser.id,
    };

    await emailjs
      .send('service_dwl8e5e', 'template_pmtw2de', params, 'nyjZso7dw3rv9ki41')
      .then(
        response => {
          console.log('SUCCESS!', response.status, response.text);
        },
        err => {
          console.log('FAILED...', err);
        }
      );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('clicked');
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
        .then(async res => {
          evaluators.length !== 0 && (await registerUser());
          if (newEvaluators.length === 1) {
            sendEmail(newEvaluators[0].email, newEvaluators[0].name);
          } else if (newEvaluators.length === 2) {
            sendEmail(newEvaluators[0].email, newEvaluators[0].name);
            sendEmail(newEvaluators[1].email, newEvaluators[1].name);
          }
          success('Sent out email(s) to evaluator(s)');
          console.log(res);
        })
        .catch(err => {
          error('Error sending out email(s) to evaluator(s)');
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return activeUser ? (
    <div className='mt-10 sm:mt-0'>
      <div className='mt-10 w-full md:mt-10'>
        <div className='overflow-hidden shadow sm:rounded-md'>
          <div className='border-2 border-[#7e7e7e] rounded-xl shadow-xl shadow-[#7092BE] shadow:opacity-20 w-4/5 mx-auto mb-7 px-4 py-5 sm:p-6 '>
            <p className=' leading-relaxed text-justify'>
              Request two faculty members familiar with you to submit Faculty
              Evaluation Form on your behalf. It is important to note that the
              faculty member should submit the evaluation form themselves.
            </p>
            <br />
            <p className=' leading-relaxed text-justify'>
              It is recommended that applicants approach faculty members who are
              not on the pre-medical advisory committee. Additionally, it is
              best to avoid choosing from faculty who may have a conflict of
              interest, such as those who may be writing you an independent
              letter of recommendation for AMCAS, CASPA, or other application
              systems.{' '}
            </p>
            <br />
            <p className=' leading-relaxed text-justify'>
              It is important to select faculty members as recommenders who have
              instructed you during your time at ULM. It is recommended to
              choose instructors who are familiar with your academic abilities,
              work ethic, and potential for success in a healthcare profession.
            </p>
            <div className='text-center font-extralight mt-5 text-red'>
              <span className='font-semibold'>Note:</span> You will have to
              click Submit to apply your changes.
            </div>

            <div className='w-full bg-white text-red p-5 rounded-lg mx-auto my-10 shadow-lg'>
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

            <div className='relative shadow-md sm:rounded-lg w-fit m-auto '>
              <table className='m-auto table w-fit text-sm text-left text-red dark:text-gray-400 overflow-x-scroll scrollbar-thin'>
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
                disabled={evaluators.length > 2}
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
