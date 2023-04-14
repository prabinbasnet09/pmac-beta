import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import Dashboard from '../components/Dashboard';
import { ActiveUser } from './_app.js';
import { Auth } from 'aws-amplify';

export default function Home({ signOut }) {
  const activeUser = useContext(ActiveUser);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(user => setUser(user))
        .catch(err => {
          console.log(err);
          setUser(null);
          router.push('/login');
        });
    };
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const { group, users } = activeUser;

  //   setGroups(group);

  //   setUsers(users);
  // }, [activeUser]);

  return user ? (
    <div>
      <Head>
        <title>PMAC</title>
        <meta name='description' content='Pre-medical Advisory committee' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <Dashboard />
      </div>
    </div>
  ) : null;
}
