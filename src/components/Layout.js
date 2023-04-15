import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

const Layout = ({ children, user }) => {
  const route = useRouter();

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow'>
        <Header user={user} />
        {children}
      </div>
      <div className='mt-20'>
        <Footer className='mt-auto' />
      </div>
    </div>
  );
};

export default Layout;
