import React from 'react';
import Navbar from './NavbarStudent';

const Layout = ({ children, user, signOut}) => {
  return (
    <div>
      <Navbar user={user} signOut={signOut}/>
      {children}
    </div>
  );
};

export default Layout;