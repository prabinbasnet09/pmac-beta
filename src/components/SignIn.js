import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '/public/ulm_academic_maroon_white.png';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import LandingHeader from './LandingHeader';
import SignUp from './SignUp';
import GuestSignIn from './GuestSignIn';

function SignIn() {
  const router = useRouter();
  const [guest, setGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [guestUser, setGuestUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordToggle, setForgotPasswordToggle] = useState(false);
  const [newPasswordToggle, setNewPasswordToggle] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const [usernameToggle, setUsernameToggle] = useState(false);
  const [confirmCodeToggle, setConfirmCodeToggle] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [signInToggle, setSignInToggle] = useState(true);

  const handleSingInToggle = e => {
    e.preventDefault();
    setSignInToggle(prevState => !prevState);
  };

  const changeLoginUser = async e => {
    e.preventDefault();
    setGuest(prevState => !prevState);
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
    try {
      let response = await Auth.signIn(username, password);
      console.log('response', response);
      router.push('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleForgotPassword = async e => {
    e.preventDefault();
    try {
      let response = await Auth.forgotPassword(username)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePasswordChange = async e => {
    try {
      let response = await Auth.forgotPasswordSubmit(
        username,
        code,
        newPassword
      );
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
      alert('Please try again');
    }
  };

  const resendConfirmationCode = async e => {
    e.preventDefault();
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  };

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
                {signInToggle ? (
                  <>
                    {!forgotPasswordToggle ? (
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
                          <div className='relative'>
                            <label
                              htmlFor='password'
                              className='block mb-2 text-sm font-medium text-black'
                            >
                              Password
                            </label>
                            <input
                              type={passwordVisibility ? 'text' : 'password'}
                              name='password'
                              id='password'
                              placeholder='••••••••'
                              className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5'
                              required=''
                              onChange={e => {
                                e.preventDefault();
                                setPassword(e.target.value);
                              }}
                            />{' '}
                            {passwordVisibility ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className=' absolute right-3 top-10 w-6 h-6 cursor-pointer'
                                onClick={e => {
                                  e.preventDefault();
                                  setPasswordVisibility(
                                    prevState => !prevState
                                  );
                                }}
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='absolute right-3 top-10 w-6 h-6 cursor-pointer '
                                onClick={e => {
                                  e.preventDefault();
                                  setPasswordVisibility(
                                    prevState => !prevState
                                  );
                                }}
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                                />
                              </svg>
                            )}
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
                            <p
                              className='text-sm font-medium text-black hover:underline hover:font-bold cursor-pointer'
                              onClick={e => {
                                e.preventDefault();
                                setForgotPasswordToggle(
                                  prevState => !prevState
                                );
                                setUsernameToggle(prevState => !prevState);
                              }}
                            >
                              Forgot password?
                            </p>
                          </div>
                          <button
                            type='submit'
                            className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                          >
                            Sign in
                          </button>
                        </form>
                      </div>
                    ) : null}

                    {usernameToggle ? (
                      <>
                        <div className='p-6'>
                          <label
                            htmlFor='email'
                            className='block mb-2 text-sm font-medium text-black'
                          >
                            Username
                          </label>
                          <input
                            className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5  mb-3'
                            placeholder='johnsmith'
                            required=''
                            onChange={e => {
                              e.preventDefault();
                              setUsername(e.target.value);
                            }}
                          />
                          <button
                            type='submit'
                            className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            onClick={e => {
                              e.preventDefault();
                              setConfirmCodeToggle(prevState => !prevState);
                              setUsernameToggle(prevState => !prevState);
                              handleForgotPassword(e);
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </>
                    ) : null}

                    {confirmCodeToggle ? (
                      <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
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
                            className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            onClick={e => {
                              e.preventDefault();
                              setNewPasswordToggle(prevState => !prevState);
                              setConfirmCodeToggle(prevState => !prevState);
                            }}
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
                    ) : null}

                    {newPasswordToggle ? (
                      <div className='p-6'>
                        <div className='relative '>
                          <label
                            htmlFor='password'
                            className='block text-sm font-medium text-black mb-3'
                          >
                            New Password
                          </label>
                          <input
                            type={passwordVisibility ? 'text' : 'password'}
                            name='password'
                            id='password'
                            placeholder='••••••••'
                            className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5 mb-3'
                            required=''
                            onChange={e => {
                              e.preventDefault();
                              setNewPassword(e.target.value);
                            }}
                          />
                          {passwordVisibility ? (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className=' absolute right-3 top-10 w-6 h-6 cursor-pointer'
                              onClick={e => {
                                e.preventDefault();
                                setPasswordVisibility(prevState => !prevState);
                              }}
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                              />
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              className='absolute right-3 top-10 w-6 h-6 cursor-pointer '
                              onClick={e => {
                                e.preventDefault();
                                setPasswordVisibility(prevState => !prevState);
                              }}
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                              />
                            </svg>
                          )}
                          <button
                            type='submit'
                            className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            onClick={e => {
                              e.preventDefault();
                              setNewPasswordToggle(prevState => !prevState);
                              setForgotPasswordToggle(prevState => !prevState);
                              handlePasswordChange(e);
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <SignUp />
                  </>
                )}
                <div className='pl-6 space-y-2 md:space-y-6 sm:p-8'>
                  <p className='text-sm font-light text-gray-500 '>
                    Don’t have an account yet?{' '}
                    <button
                      onClick={e => handleSingInToggle(e)}
                      className='font-medium text-primary-600 hover:underline'
                    >
                      {signInToggle ? (
                        <span>Sign up</span>
                      ) : (
                        <span>Sign in</span>
                      )}
                    </button>
                  </p>
                  <p>
                    <button onClick={e => changeLoginUser(e)}>
                      Login as Guest
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <GuestSignIn />
                <p className='pl-6 space-y-2 md:space-y-6 sm:p-8'>
                  <button onClick={e => changeLoginUser(e)}>
                    Login as User
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default SignIn;
