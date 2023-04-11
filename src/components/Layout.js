import React from 'react';
import Navbar from './Navbar';
import Header from './Header'

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
                  route !== '/results' &&
                  route !== '/schedule' &&
                  route !== '/forms/statementTranscript' &&
                  route !== '/forms/AppAcademicInfo' &&
                  route !== '/forms/ApplicantInfo' &&
                  route !== '/forms/infoReleaseForm' &&
                  route !== '/profile' &&
                  route !== '/forms/involvement';
        

  return (
    <div>
      <Header />
      {showNav && <Navbar user={user} signOut={signOut} />}
      {children}
    </div>
  );
};

export default Layout;
