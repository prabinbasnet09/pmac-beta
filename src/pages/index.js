import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext} from 'react'
import Tabs from '../components/Tabs'
import Login from './Login'
import SignUp from './SignUp'
import AppStatus from '../components/AppStatus'
import { ActiveUser } from './_app.js'
import { Button } from '@aws-amplify/ui-react'

import Cookies from 'js-cookie'


export default function Home({signOut}) {
  const activeUser = useContext(ActiveUser);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { group, users} = activeUser;
   
    setGroups(group);

    setUsers(users);
  }, [activeUser]);

    // handles the signout
    const handleSignOut = () => {
      //clearing local storage
      localStorage.clear();
      //clearing cookie session

      Cookies.remove(`CognitoIdentityServiceProvider.2k4676qov74l0oovdtcfvpfff0.${activeUser.username}.refreshToken`);
      Cookies.remove(`CognitoIdentityServiceProvider.2k4676qov74l0oovdtcfvpfff0.${activeUser.username}.accessToken`);
      Cookies.remove(`CognitoIdentityServiceProvider.2k4676qov74l0oovdtcfvpfff0.LastAuthUser`);
      Cookies.remove(`CognitoIdentityServiceProvider.2k4676qov74l0oovdtcfvpfff0.${activeUser.username}.idToken`);
  
      router.push('/');
    }
  

  return (
    <div>
      <Head>
        <title>PMAC</title>
        <meta name="description" content="Pre-medical Advisory committee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {
          (groups.filter(group => group === "Student").length > 0) ?
            <Tabs userGroup="Student"/> :
          (groups.filter(group => group === "Faculty").length > 0) ?
            <Tabs userGroup="Faculty"/> :
          (groups.filter(group => group === "ChairCommittee").length > 0) ?
            <Tabs userGroup="ChairCommittee"/> :
          (groups.filter(group => group === "Admin").length > 0) ?
            <>Welcome Admin</> :
          <div>Loading...</div>
        }
      </div>
      
      <button className=" m-10 p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg" onClick={(e) => {
        handleSignOut(e);
        signOut();
        }}>
        Sign Out
      </button>
    </div>
  )
}
