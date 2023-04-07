import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import Landing from "./landing";
import { ActiveUser } from "./_app.js";

export default function Home({ signOut }) {
  const activeUser = useContext(ActiveUser);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const { group, users } = activeUser;

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
        <Landing />
      </div>
    </div>
  );
}
