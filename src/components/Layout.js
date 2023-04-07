import React from 'react';
import Navbar from './Navbar';

const Layout = (props) => {
  const { children, user, signOut, route } = props;
  
  {/*Boolean to hide original navbar*/}
  const showNav = route !== '/landing' && 
                  route !== '/about' && 
                  route !== '/' &&
                  route !== '/faculty' &&
                  route !== '/contact' &&
                  route !== '/SignUp' &&
                  route !== '/dashboard' &&
                  route !== '/documents' &&
                  route !== '/results';
        

  return (
    <div>
      {showNav && <Navbar user={user} signOut={signOut} />}
      {children}
    </div>
  );
};

export default Layout;
