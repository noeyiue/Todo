import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [session, setSession] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>
      {session ? User() : Guest()}
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

//For Authorize User
function User() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>
      <div className="details">
        <h5>Unknown</h5>
        <h5>Unknown</h5>
      </div>
      <div className="flex justify-center">
        <button className="mt-5 px-10 py-1 rounded-md bg-indigo-500 text-white">Sign Out</button>
      </div>
      <div className="flex justify-center">
        <Link href={'./profile'} className='mt-5 px-10 py-1 rounded-lg bg-indigo-500 text-white'>Profile page</Link>

      </div>
    </main>
  )
}