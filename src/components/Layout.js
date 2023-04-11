import React from 'react';
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
                  route !== '/forms/involvement' &&
                  route !== '/404';
        

  return (
    <div>
      <Header />
      {showNav && <Header user={user} signOut={signOut} />}
      {children}
    </div>
  );
};

export default Layout;
