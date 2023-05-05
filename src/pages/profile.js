import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { ActiveUser } from './_app';
import { Auth } from 'aws-amplify';
import Logo from 'public/ulm_academic_maroon_white.png';
import HeadShot from 'public/headshot.webp';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const activeUser = useContext(ActiveUser);
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

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
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => true)
        .catch(err => {
          console.log(err);
          router.push('/login');
        });
    };
    fetchUser();
  }, []);

  const handlePasswordUpdate = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      success('Password successfully changed!');
    } catch (err) {
      console.log('error changing password: ', err);
      error('Error changing password!');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        name: name,
      });
      success('Profile successfully updated!');
    } catch (error) {
      error('Error updating profile!');
      console.log('error updating profile: ', error);
    }
  };

  return activeUser ? (
    <div className='flex mt-20 justify-center items-center'>
      <div className='flex flex-wrap p-5 gap-10 items-center w-3/4 justify-evenly bg-white shadow-2xl py px-2 sm:px-0 rounded-lg'>
        <div className='grid gap-y-4'>
          <div className='flex justify-center items-center'>
            <Image
              src={
                activeUser.profilePicture ? activeUser.profilePicture : HeadShot
              }
              className='h-40 w-40 rounded-full'
              alt='ULM Logo'
              width={160}
              height={160}
            />
          </div>
          <div className='text-center rounded-lg'>
            <p className='text-lg font-bold'>Profile</p>
            <p>{activeUser.username}</p>
            <p>{activeUser.name}</p>
            <p>{activeUser.email}</p>
          </div>
        </div>
        <div className='flex justify-center'>
          <form
            className='justify-center w-60'
            onSubmit={e => {
              e.preventDefault();
              handleProfileUpdate();
            }}
          >
            <label
              htmlFor='Update Name'
              className='block text-center mb-2 text-lg font-medium text-gray-900 dark:text-black'
            >
              Update Name
            </label>
            <label
              htmlFor='Name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
            >
              Full Name
            </label>
            <input
              type='text'
              id='old_password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder={activeUser.name}
              required
              onChange={e => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
            <button
              type='submit'
              className='mt-4 border-2 border-black w-full bg-white text-black shadow-xl font-bold p-3 rounded-full'
            >
              Submit
            </button>
          </form>
        </div>
        <div className='flex justify-center'>
          <form
            className='w-60'
            onSubmit={e => {
              e.preventDefault();
              handlePasswordUpdate();
            }}
          >
            <label
              htmlFor='Update Password'
              className='block text-center mb-2 text-lg font-medium text-gray-900 dark:text-black'
            >
              Update Password
            </label>
            <label
              htmlFor='Old Password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
            >
              Old Password
            </label>
            <input
              type='password'
              id='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='•••••••••'
              required
              onChange={e => {
                e.preventDefault();
                setOldPassword(e.target.value);
              }}
            />

            <label
              htmlFor='New Password'
              className='block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-black'
            >
              New Password
            </label>
            <input
              type='password'
              id='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='•••••••••'
              required
              onChange={e => {
                e.preventDefault();
                setNewPassword(e.target.value);
              }}
            />
            <button
              type='submit'
              className='mt-4 mb-10 border-2 border-black w-full bg-white text-black shadow-xl font-bold p-3 rounded-full'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
