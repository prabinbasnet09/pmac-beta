import { createContext, useState, useEffect } from "react";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import TabBar from "@/components/widgets/TabBar";

import { Amplify, API } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";

import awsExports from "../aws-exports";
import * as queries from "../api/gql/queries";
import { onUpdateUser } from "../api/gql/subscriptions";
import { useRouter } from "next/router";
Amplify.configure({ ...awsExports, ssr: true });

export const ActiveUser = createContext();

export const ActiveUserProvider = ({ children, user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const setLocalStorage = (key, value, ttl = 5 * 60 * 1000) => {
      const expiresAt = new Date(Date.now() + ttl);
      localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
    };

    const getLocalStorage = (key) => {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;

      if (new Date() >= new Date(item.expiresAt)) {
        localStorage.removeItem(key);
        return null;
      }
      return item;
    };

    if (!getLocalStorage("userInfo")) {
      API.graphql({
        query: queries.listUsers,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })
        .then((res) => {
          setLocalStorage("userInfo", res.data.listUsers.items);
          setUsers(res.data.listUsers.items);
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    } else {
      setUsers(getLocalStorage("userInfo").value);
    }

    const updateUser = API.graphql({
      query: onUpdateUser,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).subscribe({
      next: (userData) => {
        API.graphql({
          query: queries.listUsers,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })
          .then((res) => {
            setLocalStorage("userInfo", res.data.listUsers.items);
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
      },
      error: (error) => {
        console.log(error);
      },
    });

    return () => {
      updateUser.unsubscribe();
    };
  }, []);

  let loggedUser;
  if (users.length === 1 && users[0].groups[0] === "Student") {
    loggedUser = {
      id: user.attributes.sub,
      username: user.username,
      name: user.attributes.name,
      email: user.attributes.email,
      group: users[0].groups,
      personalStatement: users[0].personalStatement,
      transcript: users[0].transcript,
      amcasForm: users[0].amcasForm,
      facultyRecommendation: users[0].facultyRecommendation,
      applicantForm: users[0].applicantForm,
      applicantReleaseForm: users[0].applicantReleaseForm,
      schedule: users[0].schedule,
    };
  } else {
    loggedUser = {
      id: user.attributes.sub,
      username: user.username,
      name: user.attributes.name,
      email: user.attributes.email,
      group: users
        .filter((userProfile) => userProfile.username === user.username)
        .map((user) => user.groups[0]),
      users: users,
    };
  }

  return (
    <ActiveUser.Provider value={loggedUser}>{children}</ActiveUser.Provider>
  );
};

function App(props) {
  const { Component, pageProps, user, signOut, router: route } = props;
  const [userGroup, setUserGroup] = useState();
  const router = useRouter();

  const showNav =
    router.pathname === "/dashboard" ||
    router.pathname === "/documents" ||
    router.pathname === "/schedule" ||
    router.pathname === "/results" ||
    router.pathname === "/applicants";

  const getUserGroup = async () => {
    const userGroup = await API.graphql({
      query: queries.getUser,
      variables: { id: user.attributes.sub },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
      .then((res) => {
        return res.data.getUser.groups[0];
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    setUserGroup(userGroup);
  };

  getUserGroup();

  const withLayout = (Component) => {
    return function WrappedComponent(props) {
      const tabs =
        userGroup === "Student"
          ? [
              {
                name: "Dashboard",
                path: "/dashboard",
              },
              {
                name: "Documents",
                path: "/documents",
              },
              {
                name: "Schedule",
                path: "/schedule",
              },
              {
                name: "Results",
                path: "/results",
              },
            ]
          : userGroup === "Faculty"
          ? [
              {
                name: "Dashboard",
                path: "/dashboard",
              },
              {
                name: "Applicants",
                path: "/applicants",
              },
              {
                name: "Schedule",
                path: "/schedule",
              },
              {
                name: "Results",
                path: "/results",
              },
            ]
          : userGroup === "ChairCommittee"
          ? [
              {
                name: "Dashboard",
                path: "/dashboard",
              },
              {
                name: "Applicants",
                path: "/applicants",
              },
              {
                name: "Schedule",
                path: "/schedule",
              },
              {
                name: "Results",
                path: "/results",
              },
            ]
          : userGroup === "Admin"
          ? [
              {
                name: "Dashboard",
                path: "/dashboard",
              },
              {
                name: "Admin",
                path: "/applicants",
              },
            ]
          : null;
      return (
        <Layout user={user} signOut={signOut} route={route.state.route}>
          {userGroup && showNav ? <TabBar tabList={tabs} /> : null}
          <Component {...props} user={user} signOut={signOut} />
        </Layout>
      );
    };
  };

  const LayoutComponent = withLayout(Component);

  return (
    <ActiveUserProvider user={user}>
      <LayoutComponent {...pageProps} user={user} signOut={signOut} />
    </ActiveUserProvider>
  );
}

export default withAuthenticator(App);
// export default App;
