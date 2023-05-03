import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Purpose from '@/components/Purpose';
import Apply from '@/components/Apply';
import Player from '@/components/widgets/Player';
import LandingHeader from '@/components/LandingHeader';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';

const Landing = () => {
  const [user, setUser] = useState(null);
  const [guestUser, setGuestUser] = useState(null);
  const router = useRouter();

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

  return !user || !guestUser ? (
    <>
      <LandingHeader />
      <div className='min-h-screen flex flex-col'>
        <Hero />
        <Purpose />
        <div className='hidden sm:block'>
          <Apply />
        </div>
        <Player />
        <Footer />
      </div>
    </>
  ) : null;
};

export default Landing;
