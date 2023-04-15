import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '/public/ulm_academic_maroon_white.png';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import LandingHeader from './LandingHeader';

function SignIn() {
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [guest, setGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [guestUser, setGuestUser] = useState(null);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPassword, setGuestPassword] = useState('');
  const [signIn, setSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setLocalStorage = (key, value, ttl = 5 * 60 * 1000) => {
    const expiresAt = new Date(Date.now() + ttl);
    localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
  };

  const getLocalStorage = key => {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;

    if (new Date() >= new Date(item.expiresAt)) {
      localStorage.removeItem(key);
      return null;
    }
    return item;
  };

  const signUpHandler = () => {
    setSignUp(true);
    setSignIn(false);
  };

  const signInHandler = () => {
    setSignIn(true);
    setSignUp(false);
  };

  const changeLoginUser = async e => {
    e.preventDefault();
    setGuest(prevState => !prevState);
  };

  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => {
          setUser(user);
          router.push('/');
        })
        .catch(err => {
          console.log(err);
          setUser(null);
          router.push('/login');
        });
    };

    if (!getLocalStorage('guestUser')) {
      setGuestUser(null);
      fetchUser();
    } else {
      setGuestUser(getLocalStorage('guestUser').value);
      router.push('/home');
    }
  }, []);

  const handleSignIn = async e => {
    e.preventDefault();
    if (guest) {
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
    } else {
      try {
        let response = await Auth.signIn(username, password);
        console.log('response', response);
        router.push('/');
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const handleSignUp = () => {};

  return !user && !guestUser ? (
    <div>
      <div className='md:h-screen'>
        <div className='flex flex-col items-center justify-center px-6  mx-auto md:h-screen '>
          <Link
            href='/home'
            className='flex items-center mb-6 text-2xl font-semibold text-gray '
          >
            <Image className='w-14 mr-2' src={Logo} alt='logo' />
          </Link>

          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 '>
            {!guest ? (
              <div>
                {!signUp && signIn && (
                  <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-red md:text-2xl'>
                      Sign in to your account
                    </h1>
                    <form
                      className='space-y-4 md:space-y-6'
                      onSubmit={e => handleSignIn(e)}
                    >
                      <div>
                        <label
                          htmlFor='email'
                          className='block mb-2 text-sm font-medium text-black'
                        >
                          Your Username
                        </label>
                        <input
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
                            <label
                              htmlFor='remember'
                              className='text-black opacity-75'
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a
                          href='#'
                          className='text-sm font-medium text-black hover:underline'
                        >
                          Forgot password?
                        </a>
                      </div>
                      <button
                        type='submit'
                        className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                      >
                        Sign in
                      </button>
                      <p className='text-sm font-light text-gray-500 '>
                        Don’t have an account yet?{' '}
                        <button
                          onClick={() => signUpHandler()}
                          className='font-medium text-primary-600 hover:underline'
                        >
                          Sign up
                        </button>
                      </p>
                      <p>
                        <button onClick={e => changeLoginUser(e)}>
                          Login as Guest
                        </button>
                      </p>
                    </form>
                  </div>
                )}

                {signUp && !signIn && (
                  <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-red md:text-2xl'>
                      Sign Up
                    </h1>
                    <form
                      className='space-y-4 md:space-y-6'
                      onSubmit={() => handleSignUp()}
                    >
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
                            <label
                              htmlFor='remember'
                              className='text-black opacity-75'
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a
                          href='#'
                          className='text-sm font-medium text-black hover:underline'
                        >
                          Forgot password?
                        </a>
                      </div>
                      <button
                        type='submit'
                        className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                      >
                        Sign Up
                      </button>
                      <p className='text-sm font-light text-gray-500 '>
                        Already Have An Account?{' '}
                        <button
                          onClick={() => signInHandler()}
                          className='font-medium text-primary-600 hover:underline'
                        >
                          Sign in
                        </button>
                      </p>
                      <p>
                        <button onClick={e => changeLoginUser(e)}>
                          Login as Guest
                        </button>
                      </p>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <form
                  className='space-y-4 md:space-y-6'
                  onSubmit={e => handleSignIn(e)}
                >
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
                  <p>
                    <button onClick={e => changeLoginUser(e)}>
                      Login as User
                    </button>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default SignIn;
