import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Logo from '/public/ulm_academic_maroon_white.png';
import { Auth } from 'aws-amplify';
import SignIn from '@/components/SignIn';
import LandingHeader from '@/components/LandingHeader';
import Footer from '@/components/Footer';
import { getUser } from '@/api/gql/queries';

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
          router.push('/home');
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
    <div className='min-h-screen flex flex-col'>
      <div>
        <LandingHeader />
      </div>
      <div>
        <SignIn />
      </div>
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default Login;
