import React from 'react';
import Navbar from './Navbar';

const Layout = (props) => {
  const { children, user, signOut, route } = props;
  
  const showNav = route !== '/' && route !== '/about';

  return (
    <div>
      {showNav && <Navbar user={user} signOut={signOut} />}
      {children}
    </div>
  );
};

export default Layout;
