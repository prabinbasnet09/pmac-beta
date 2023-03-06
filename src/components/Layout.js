import React from 'react';
import Navbar from './NavbarStudent';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;