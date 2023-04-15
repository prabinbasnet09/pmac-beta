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
    e.preventDefault();
    try {
      let response = await Auth.forgotPasswordSubmit(
        username,
        code,
        newPassword
      );
      console.log('response', response);
      router.push('/');
    } catch (error) {
      console.log('error', error);
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
                        <label
                          htmlFor='password'
                          className='block text-sm font-medium text-black mb-3'
                        >
                          New Password
                        </label>
                        <input
                          type='password'
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
                        <button
                          type='submit'
                          className='w-full text-white bg-red hover:opacity-80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                          onClick={e => {
                            e.preventDefault();
                            handlePasswordChange(e);
                          }}
                        >
                          Submit
                        </button>
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
