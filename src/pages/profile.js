import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { ActiveUser } from './_app';
import { Auth } from 'aws-amplify';
import Logo from '../images/ulm_academic_maroon_white.png';

export default function Profile() {
  const activeUser = useContext(ActiveUser);
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordUpdate = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      alert('Password successfully changed!');
    } catch (error) {
      console.log('error changing password: ', error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        name: name,
      });
      alert('Profile successfully updated!');
    } catch (error) {
      console.log('error updating profile: ', error);
    }
  };

  return (
    <div className='bg-gray grid justify-center mt-10 mx-20'>
      <div className='flex justify-center rounded-lg mt-10 mb-5 w-60'>
        <Image src={Logo} className='w-[5rem] rounded-full' alt='ULM Logo' />
      </div>

      <div className='bg-white rounded-lg text-center shadow-xl'>
        <p className='text-lg font-bold'>Profile</p>
        <p>{activeUser.username}</p>
        <p>{activeUser.name}</p>
        <p>{activeUser.email}</p>
      </div>

      <form
        className=' mt-10 w-60'
        onSubmit={e => {
          e.preventDefault();
          handleProfileUpdate();
          <label
            htmlFor='Update Name'
            className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'
          >
            Update Name
          </label>;
        }}
      >
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

      <form
        className=' mt-10 w-60'
        onSubmit={e => {
          e.preventDefault();
          handlePasswordUpdate();
          <label
            htmlFor='Update Password'
            className='block mb-2 text-lg font-medium text-gray-900 dark:text-black'
          >
            Update Password
          </label>;
        }}
      >
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
  );
}
