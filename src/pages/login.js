import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Logo from '/src/images/ulm_academic_maroon_white.png';
// import backgroundImage from '/public/ulm_academic_maroon_white';
import { Auth } from 'aws-amplify';

function Login() {
  const [user, setUser] = useState(null);
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    fetchUser();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let response = await Auth.signIn(username, password);
      console.log('response', response);
      router.push('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  return !user ? (
    <div>
      <p className='text-6xl'>Welcom to PMAC</p>
      <button
        onClick={() => setSignup(!signup)}
        className='m-3 p-3 bg-slate-800 text-white rounded-md'
      >
        Sign Up
      </button>
      {signup && (
        <section className='bg-gray h-screen'>
          {/* Test */}
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <a
              href='#'
              className='flex items-center mb-6 text-2xl font-semibold text-gray '
            >
              <Image className='w-14 mr-2' src={Logo} alt='logo' />
            </a>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 '>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-center text-xl font-bold leading-tight tracking-tight text-red md:text-2xl'>
                  Sign in to your account
                </h1>
                <form className='space-y-4 md:space-y-6' action='#'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-black'
                    >
                      Your username
                    </label>
                    <input
                      type='username'
                      name='username'
                      id='username'
                      className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5  '
                      placeholder='johndoe'
                      onChange={e => setUsername(e.target.value)}
                      required=''
                    />
                  </div>
                  {/* <div>
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
                      className='bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-green focus:border-green block w-full p-2.5  '
                      placeholder='name@company.com'
                      onChange={e => setEmail(e.target.value)}
                      required=''
                    />
                  </div> */}
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
                      onChange={e => setPassword(e.target.value)}
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
                    onClick={e => handleSubmit(e)}
                  >
                    Sign in
                  </button>
                  <p className='text-sm font-light text-gray-500 '>
                    Don’t have an account yet?{' '}
                    <a
                      href='#'
                      className='font-medium text-primary-600 hover:underline'
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  ) : null;
}

export default Login;
