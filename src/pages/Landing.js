import React from 'react';
import Hero from '@/components/Hero';
import Purpose from '@/components/Purpose';
import Apply from '@/components/Apply';
import Player from '@/components/Player';
import Header from '@/components/Header';

const Landing = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Purpose />
      <Apply />
      <Player />
    </div>
  );
};

export default Landing;
