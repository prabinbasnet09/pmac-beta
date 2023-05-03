import { createContext, useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/calendar.module.css';
import Layout from '@/components/Layout';
import TabBar from '@/components/widgets/TabBar';
import { useRouter } from 'next/router';
import awsExports from '../aws-exports';
import * as queries from '../graphql/queries';
import { onUpdateUser } from '../graphql/subscriptions';
import { Amplify, API, Hub, Auth } from 'aws-amplify';

Amplify.configure(awsExports);
export const ActiveUser = createContext();

export const ActiveUserProvider = ({ children, currentUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const setLocalStorage = (key, value, ttl = 5 * 60 * 1000) => {
      const expiresAt = new Date(Date.now() + ttl);
      localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
    };

    const getLocalStorage = key => {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;

      if (new Date() >= new Date(item.expiresAt)) {
        localStorage.removeItem(key);
        return null;
      }
      return item;
    };

    if (!getLocalStorage('userInfo')) {
      API.graphql({
        query: queries.listUsers,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
        .then(res => {
          setLocalStorage('userInfo', res.data.listUsers.items);
          setUsers(res.data.listUsers.items);
        })
        .catch(err => {
          console.log(err);
          return null;
        });
    } else {
      setUsers(getLocalStorage('userInfo').value);
    }

    const updateUser = API.graphql({
      query: onUpdateUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }).subscribe({
      next: userData => {
        API.graphql({
          query: queries.listUsers,
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
          .then(res => {
            setLocalStorage('userInfo', res.data.listUsers.items);
            setUsers(res.data.listUsers.items);
          })
          .catch(err => {
            console.log(err);
            return null;
          });
      },
      error: error => {
        console.log(error);
      },
    });

    return () => {
      updateUser.unsubscribe();
    };
  }, []);

  useEffect(() => {
    initializeUser();
    console.log(loggedUser);
  }, [users]);

  let loggedUser;
  const initializeUser = () => {
    if (users.length === 1 && users[0].groups[0] === 'Student') {
      loggedUser = {
        id: currentUser.attributes.sub,
        username: currentUser.username,
        name: currentUser.attributes.name,
        email: currentUser.attributes.email,
        group: users[0].groups,
        personalStatement: users[0].personalStatement,
        transcript: users[0].transcript,
        amcasForm: users[0].amcasForm,
        facultyRecommendation: users[0].facultyRecommendation,
        applicantForm: users[0].applicantForm,
        applicantReleaseForm: users[0].applicantReleaseForm,
        evaluators: users[0].evaluators,
        schedule: users[0].schedule,
        notes: users[0].notes,
        interview: users[0].interview,
        profilePicture: users[0].profilePicture,
        results: users[0].results,
      };
    } else {
      loggedUser = {
        id: currentUser.attributes.sub,
        username: currentUser.username,
        name: currentUser.attributes.name,
        email: currentUser.attributes.email,
        group: users
          .filter(userProfile => userProfile.username === currentUser.username)
          .map(user => user.groups[0]),
        users: users.filter(
          userProfile =>
            userProfile.groups[0] !== 'Admin' &&
            userProfile.username !== currentUser.username
        ),
        assignedApplicants: users
          .filter(userProfile => userProfile.username === currentUser.username)
          .map(user => user.assignedApplicants),
        schedule: users
          .filter(userProfile => userProfile.username === currentUser.username)
          .map(user => user.schedule),
        profilePicture: users
          .filter(userProfile => userProfile.username === currentUser.username)
          .map(user => user.profilePicture)[0],
        verified: users
          .filter(userProfile => userProfile.username === currentUser.username)
          .map(user => user.verified)[0],
      };
    }
  };

  initializeUser();
  console.log('loggedUser', loggedUser);
  return (
    <ActiveUser.Provider value={loggedUser}>{children}</ActiveUser.Provider>
  );
};

function App({ Component, pageProps }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [userGroup, setUserGroup] = useState();

  useEffect(() => {
    const setLocalStorage = (key, value, ttl = 365 * 24 * 60 * 60 * 1000) => {
      const expiresAt = new Date(Date.now() + ttl);
      localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
    };

    const getLocalStorage = key => {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;

      if (new Date() >= new Date(item.expiresAt)) {
        localStorage.removeItem(key);
        return null;
      }
      return item;
    };

    !currentUser && getLocalStorage('currentUser')
      ? setCurrentUser(getLocalStorage('currentUser').value)
      : null;

    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setCurrentUser(data);
          setLocalStorage('currentUser', data);
          break;
        case 'signOut':
          setCurrentUser(null);
          break;
      }
    });
  }, []);

  const showNav =
    router.pathname === '/' ||
    router.pathname === '/documents' ||
    router.pathname === '/schedule' ||
    router.pathname === '/results' ||
    router.pathname === '/applicants';

  const getUserGroup = async () => {
    const userGroup = await API.graphql({
      query: queries.getUser,
      variables: { id: currentUser.attributes.sub },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
      .then(res => {
        return res.data.getUser.groups[0];
      })
      .catch(err => {
        console.log(err);
        return null;
      });
    setUserGroup(userGroup);
  };

  currentUser && getUserGroup();

  const withLayout = Component => {
    return function WrappedComponent(props) {
      const tabs =
        userGroup === 'Student'
          ? [
              {
                name: 'Dashboard',
                path: '/',
              },
              {
                name: 'Documents',
                path: '/documents',
              },
              {
                name: 'Schedule',
                path: '/schedule',
              },
              {
                name: 'Results',
                path: '/results',
              },
            ]
          : userGroup === 'Faculty'
          ? [
              {
                name: 'Dashboard',
                path: '/',
              },
              {
                name: 'Applicants',
                path: '/applicants',
              },
              {
                name: 'Schedule',
                path: '/schedule',
              },
            ]
          : userGroup === 'ChairCommittee'
          ? [
              {
                name: 'Dashboard',
                path: '/',
              },
              {
                name: 'Users',
                path: '/applicants',
              },
              {
                name: 'Schedule',
                path: '/schedule',
              },
            ]
          : userGroup === 'Admin'
          ? [
              {
                name: 'Admin',
                path: '/applicants',
              },
            ]
          : null;
      return (
        <Layout user={currentUser}>
          {userGroup && showNav ? <TabBar tabList={tabs} /> : null}
          <Component {...props} />
        </Layout>
      );
    };
  };

  const LayoutComponent = withLayout(Component);
  return (
    <>
      {currentUser ? (
        <ActiveUserProvider currentUser={currentUser}>
          <LayoutComponent {...pageProps} />
        </ActiveUserProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

// export default withAuthenticator(App);
export default App;
