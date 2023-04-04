import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  const { children, user, signOut, route } = props;
  console.log({ route });
  return (
    <div>
      {route !== "/" && <Navbar user={user} signOut={signOut} />}
      {children}
    </div>
  );
};

export default Layout;
