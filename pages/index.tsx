import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from 'next';
import { useState } from "react";
import styles from "../styles/Home.module.css";

import { useSession, getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";


export default function Home() {

  const {data: session} = useSession();

  async function handleSignOut(): Promise<void> {
    await signOut();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>
      {session ? <User session={session} handleSignOut={handleSignOut}/> : <Guest />}
    </div>
  );
}

//For Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link href={'./login'} className='mt-5 px-10 py-1 rounded-lg bg-indigo-500 text-white'>Sign In</Link>
      </div>
    </main>
  );
}

//For Authorized User
function User({ session, handleSignOut }: { session: Session, handleSignOut: () => Promise<void> }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>
      <div className="details">
        {session.user && (
          <>
            <h5>{session.user.name}</h5>
            <h5>{session.user.email}</h5>
          </>
        )}
      </div>
      <div className="flex justify-center">
        <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-md bg-indigo-500 text-white" >Sign Out</button>
      </div>
      <div className="flex justify-center">
        <Link href={'./profile'} className='mt-5 px-10 py-1 rounded-lg bg-indigo-500 text-white'>Profile page</Link>
      </div>
    </main>
  );
}


//Protected Route
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};