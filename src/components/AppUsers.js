// This page is specially for admin
import React, { useEffect } from 'react';
import { ActiveUser } from '../pages/_app.js';
import { useContext, useState } from 'react';

import { updateUser, deleteUser } from '../graphql/mutations';
import { onUpdateUser } from '../graphql/subscriptions';
import { API } from '@aws-amplify/api';
import { Auth } from '@aws-amplify/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppUsers() {
  const activeUser = useContext(ActiveUser);
  const [users, setUsers] = useState(activeUser.users);

  let groupList = ['Student', 'Faculty', 'ChairCommittee'];
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
    const updateUser = API.graphql({
      query: onUpdateUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }).subscribe({
      next: userData => {
        setUsers(prevUsers => {
          return prevUsers.map(user => {
            if (user.id === userData.value.data.onUpdateUser.id) {
              return userData.value.data.onUpdateUser;
            } else {
              return user;
            }
          });
        });
      },
    });

    return () => {
      updateUser.unsubscribe();
    };
  }, []);

  const handleUserVerification = async (e, user) => {
    e.preventDefault();
    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            verified: true,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(res => {
          console.log(res);
          success('User verified successfully');
        })
        .catch(err => {
          console.log(err);
          error('User not verified');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleGroup = async (e, group, user) => {
    e.preventDefault();
    try {
      await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            groups: [group],
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(res => {
          console.log(res);
          success('User group updated successfully');
        })
        .catch(err => {
          console.log(err);
          error('User group not updated');
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async user => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (!confirm) return;
    const params = {
      Username: user.username,
      UserPoolId: 'us-east-1_mzA1SonwR',
    };
    try {
      await API.graphql({
        query: deleteUser,
        variables: {
          input: {
            id: user.id,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(async res => {
          console.log(res);
          try {
            await Auth.adminDeleteUser(params)
              .then(res => {
                success('User deleted successfully');
              })
              .catch(err => {
                error('User not deleted');
              });
          } catch (err) {
            console.log(err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='w-full'>
      <div className='md:relative overflow-x-auto shadow-md sm:rounded-lg bg-white '>
        <div className='flex items-center justify-between pb-4 bg-white dark:bg-gray-900'>
          <label htmlFor='table-search' className='sr-only'>
            Search
          </label>
          <div className='relative p-5'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='table-search-users'
              className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search for users'
            />
          </div>
        </div>

        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-scroll'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Username
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              {activeUser.group[0] === 'Admin' ? (
                <>
                  <th scope='col' className='px-6 py-3'>
                    Group
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Verified
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Delete User
                  </th>
                </>
              ) : (
                <>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Application
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Notify Users
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => {
                return activeUser.group[0] === 'Admin'
                  ? user.groups[0] !== 'Admin'
                  : user.groups[0] === 'Student';
              })
              .map(user => {
                return (
                  <tr
                    className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'
                    key={user.id}
                  >
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black'
                    >
                      {user.name}
                    </th>
                    <td className='px-6 py-4'>{user.username}</td>
                    <td className='px-6 py-4'>{user.email}</td>

                    {/* ONLY ADMIN */}
                    {activeUser.group[0] === 'Admin' ? (
                      <>
                        <td className='px-6 py-4'>
                          <select
                            name='plan'
                            id='plan'
                            onClick={e => {
                              console.log(e.target.value);
                              e.target.value !== user.groups[0]
                                ? handleGroup(e, e.target.value, user)
                                : null;
                            }}
                          >
                            <option>{user.groups[0]}</option>
                            {groupList
                              .filter(group => group !== user.groups[0])
                              .map(group => (
                                <option key={group}>{group}</option>
                              ))}
                          </select>
                        </td>
                        <td className='px-6 py-4'>
                          {user.verified ? (
                            <button className='p-2 bg-[rgb(173,245,177)] text-[rgb(255,255,255) rounded-lg disabled:'>
                              Verified
                            </button>
                          ) : (
                            <button
                              className='p-2 bg-[rgb(245,191,148)] text-[rgb(255,255,255) rounded-lg'
                              onClick={e => handleUserVerification(e, user)}
                            >
                              Click to verify
                            </button>
                          )}
                        </td>
                        <td className='px-6 py-4'>
                          <button
                            className='p-2 bg-[#e51010] text-[rgb(255,255,255) rounded-lg text-white font-semibold'
                            onClick={e => {
                              e.preventDefault();
                              handleDeleteUser(user);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className='px-6 py-4'>
                          {user.fileURL &&
                          user.fileURL.length === 2 &&
                          user.personalStatement &&
                          user.transcript &&
                          user.profilePicture ? (
                            <button className='p-2 bg-[rgb(93,235,100)] text-[rgb(255,255,255) rounded-lg'>
                              Complete
                            </button>
                          ) : (
                            <button className='p-2 bg-[rgb(252,132,132)] text-[rgb(255,255,255) rounded-lg'>
                              Incomplete
                            </button>
                          )}
                        </td>
                        <td className='px-6 py-4'>
                          <button className='p-2 bg-[rgb(183,248,157)] text-[rgb(255,255,255) rounded-lg'>
                            View
                          </button>
                        </td>
                        <td className='px-6 py-4'>
                          <button className='p-2 bg-[rgb(247,190,144)] text-[rgb(255,255,255) rounded-lg'>
                            Notify
                          </button>
                        </td>
                      </>
                    )}
                    {/* ONLY ADMIN */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
