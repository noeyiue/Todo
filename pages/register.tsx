import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
// import { useForm } from "react-hook-form";

import styles from "../styles/Form.module.css";

import { HiAtSymbol, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import { useState } from "react";

export default function Register() {
  const [show, setShow] = useState({password: false, cpassword: false});
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold ">Register</h1>
        </div>
        <form className="flex flex-col gap-5">
          <div className={styles.input_group}>
            <input
              type="text"
              name="Username"
              placeholder="Username"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-3 ">
              <HiUser size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-3 ">
              <HiAtSymbol size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-3"
              onClick={() => setShow({...show, password: !show.password})}
            >
              {show.password ? <HiEye size={20} /> : <HiEyeOff size={20} />}
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-3"
              onClick={() => setShow({...show, cpassword: !show.cpassword})}
            >
              {show.cpassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
            </span>
          </div>
          <div className={styles.button}>
            <button type="submit">Login</button>
          </div>
         
        </form>
        <p className="text-center text-gray-400">
          already have an account?{" "}
          <Link href={"login"} className="text-blue-500">
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
}
