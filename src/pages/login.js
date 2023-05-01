import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Logo from '/public/ulm_academic_maroon_white.png';
import { Auth } from 'aws-amplify';
import SignIn from '@/components/SignIn';
import LandingHeader from '@/components/LandingHeader';
import Footer from '@/components/Footer';
import { getUser } from '../graphql/queries';

function Login() {
  const [user, setUser] = useState(null);
  const [guestUser, setGuestUser] = useState(null);

  const router = useRouter();

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
        });
    };

    if (!getLocalStorage('guestUser')) {
      setGuestUser(null);
      fetchUser();
    } else {
      setGuestUser(getLocalStorage('guestUser').value);
      router.push('/recommendationForm');
    }
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

  return !user || !guestUser ? (
    <div className='min-h-screen flex flex-col z-20'>
      <div className='z-20'>
        <LandingHeader absolute/>
      </div>
      <div className='relative'>
          <div className='z-10 fixed inset-0 w-full h-full object-cover'>
            <Image
              className='w-full mx-auto relative'
              src='/aerial.jpg'
              alt=''
              width={1980}
              height={1024}
          />
        </div>
        </div>
      <div className='z-20 justify-center'>
        <SignIn/>
      </div>
      <div className='mt-auto z-20'>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default Login;
