import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { Hub } from '@aws-amplify/core';

export default function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpToggle, setSignUpToggle] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSignUp = async e => {
    e.preventDefault();
    setSignUpToggle(prevState => !prevState);
    console.log('clicked');
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  const confirmSignUp = async e => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  };

  Hub.listen('auth', ({ payload }) => {
    const { event } = payload;
    if (event === 'autoSignIn') {
      router.push('/');
    } else if (event === 'autoSignIn_failure') {
      router.push('/login');
    }
  });

  const resendConfirmationCode = async e => {
    e.preventDefault();
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  };

  return (
    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
      {!signUpToggle ? (
        <>
          <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-red md:text-2xl'>
            Sign Up
          </h1>
          <form
            className='space-y-4 md:space-y-6'
            onSubmit={e => handleSignUp(e)}
          >
            <div>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-black'
              >
                Name
              </label>
              <input
                type='name'
                name='name'
                id='name'
                className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5  '
                placeholder='John Smith'
                required=''
                onChange={e => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor='username'
                className='block mb-2 text-sm font-medium text-black'
              >
                Username
              </label>
              <input
                type='username'
                name='username'
                id='username'
                className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5  '
                placeholder='johnsmith'
                required=''
                onChange={e => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-black'
              >
                Email Address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5  '
                placeholder='name@company.com'
                required=''
                onChange={e => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
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
                onChange={e => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-black'
              >
                Confirm Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5'
                required=''
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='remember'
                    aria-describedby='remember'
                    type='checkbox'
                    className='w-4 h-4 border border-black rounded bg-white focus:ring-3 focus:ring-blue '
                    required=''
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='remember' className='text-black opacity-75'>
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Sign Up
            </button>
          </form>
        </>
      ) : (
        <div>
          <div>
            <label className='block mb-2 text-sm font-medium text-black'>
              Confirmation Code
            </label>
            <input
              className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5  '
              placeholder='XXXX'
              required=''
              onChange={e => {
                e.preventDefault();
                setCode(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type='submit'
              className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5'
              onClick={e => confirmSignUp(e)}
            >
              Submit
            </button>
            <p
              className='flex justify-center mt-5 underline underline-offset-4 font-medium hover:font-bold cursor-pointer'
              onClick={e => resendConfirmationCode(e)}
            >
              Resend Confirmation Code
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
