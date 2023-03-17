import { createContext, useState, useEffect} from "react";
import '../styles/globals.css'
import Layout from '@/components/Layout'
import TabBar from '@/components/TabBar'

import { Amplify, API} from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import * as queries from '../graphql/queries'
import { onUpdateUser } from '@/graphql/subscriptions.js';

import awsExports from "../aws-exports";
import { useRouter } from 'next/router';
Amplify.configure({...awsExports, ssr: true});

export const ActiveUser = createContext();

export const ActiveUserProvider = ({children, user}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const setLocalStorage = (key, value, ttl = 5 * 60 * 1000) => {
      const expiresAt = new Date(Date.now() + ttl);
      localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
    };

    const getLocalStorage = (key) => {
      const item = JSON.parse(localStorage.getItem(key));
      if(!item) return null
      
      if(new Date() >= new Date(item.expiresAt)) {
        localStorage.removeItem(key);
        return null;
      }
      return item;
    };
    
    if(!getLocalStorage('userInfo')) {
      API.graphql({
        query: queries.listUsers,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      })
      .then((res) => {
        console.log(res.data.listUsers.items);
        setLocalStorage('userInfo', res.data.listUsers.items);
        setUsers(res.data.listUsers.items);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    }
    else{
      setUsers(getLocalStorage('userInfo').value);
    }

    const updateUser = API.graphql({
      query: onUpdateUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }).subscribe({
      next: (userData) => {
        API.graphql({
          query: queries.listUsers,
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        })
        .then((res) => {
          setLocalStorage('userInfo', res.data.listUsers.items);
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      },
      error: (error) => {
        console.log(error);
      }
    })

    return () => {
      updateUser.unsubscribe();
    }

  }, []);

  const loggedUser = {
    id: user.attributes.sub,
    username: user.username,
    name: user.attributes.name,
    email: user.attributes.email,
    group: users.filter((userProfile) => userProfile.username === user.username).map((user) => user.groups[0]),
    personalStatement: user.attributes.personalStatement,
    transcript: user.attributes.transcript,
    amcasForm: user.attributes.amcasForm,
    users: users
  } 
  
  return (
    <ActiveUser.Provider value={loggedUser} >
      {children}
    </ActiveUser.Provider>
  )
}

function App({ Component, pageProps, user, signOut}) {
  const [userGroup, setUserGroup] = useState();
  const router = useRouter();

  const showNav = router.pathname === '/' || router.pathname === '/documents' || router.pathname === '/schedule' || router.pathname === '/results' || router.pathname === '/applicants';

  const getUserGroup = async () => {
    const userGroup = await API.graphql({
      query: queries.getUser,
      variables: { id: user.attributes.sub },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
    .then((res) => {
      return res.data.getUser.groups[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
    setUserGroup(userGroup);
  }

  getUserGroup();

  const withLayout = (Component) => {

    return function WrappedComponent(props) {
    const tabs = 
    (userGroup === "Student") ?
        [{
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Documents",
            path: "/documents"
        },
        {
            name: "Schedule",
            path: "/schedule"
        },
        {
            name: "Results",
            path: "/results"
        },
        ] :
        
        (userGroup === "Faculty") ?
        [{
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Applicants",
            path: "/applicants"
        },
        {
            name: "Schedule",
            path: "/schedule"
        },
        {
            name: "Results",
            path: "/results"
        },
        ] :
        (userGroup === "ChairCommittee") ?
        [{
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Applicants",
            path: "/applicants"
        },
        {
            name: "Schedule",
            path: "/schedule"
        },
        {
            name: "Results",
            path: "/results"
        },
        ] :
        (userGroup === "Admin") ?
        [{
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Admin",
            path: "/applicants"
        }
        ] :
        null
      return (
        <Layout user={user} signOut={signOut}>
          { userGroup && showNav ? <TabBar tabList={tabs} /> : null}
          <Component {...props} user={user} signOut={signOut}/>
        </Layout>
      )
    }
  }
  
  const LayoutComponent = withLayout(Component);

  return ( 
    <ActiveUserProvider user={user} >
      <LayoutComponent {...pageProps} user={user} signOut={signOut} />
    </ActiveUserProvider> 
  )
}

export default withAuthenticator(App)
