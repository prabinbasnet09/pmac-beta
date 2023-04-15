import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function GuestSignIn() {
  const router = useRouter();
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPassword, setGuestPassword] = useState('');

  const setLocalStorage = (key, value, ttl = 5 * 60 * 1000) => {
    const expiresAt = new Date(Date.now() + ttl);
    localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
  };

  const handleSignIn = async e => {
    e.preventDefault();
    const backendURL =
      'https://99ym30ffli.execute-api.us-east-1.amazonaws.com/prod/login';

    const requestConfig = {
      headers: {
        'x-api-key': 'PBDYZzW59J6ZeQH6qDFGE3kd8BE34BFRavTb6Sez',
      },
    };
    const requestBody = {
      email: guestEmail,
      password: guestPassword,
    };
    axios
      .post(backendURL, requestBody, requestConfig)
      .then(response => {
        setLocalStorage('guestUser', response.data);
        router.push('/recommendationForm');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
      <form className='space-y-4 md:space-y-6' onSubmit={e => handleSignIn(e)}>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-black'
          >
            Your email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5 '
            onChange={e => setGuestEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-black'
          >
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='••••••••'
            className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5'
            required=''
            onChange={e => setGuestPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
