import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext} from 'react'
import Dashboard from '../components/Dashboard'
import Login from './login'
import SignUp from './SignUp'
import AppStatus from '../components/Dashboard'
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

  return (
    <div>
      <Head>
        <title>PMAC</title>
        <meta name="description" content="Pre-medical Advisory committee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Dashboard />
      </div>
    </div>
  )
}
