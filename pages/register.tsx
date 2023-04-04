import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import { useForm } from "react-hook-form";

import styles from "../styles/Form.module.css";

import { HiAtSymbol, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import { useState } from "react";

export default function Register() {
  const [show, setShow] = useState({password: false, cpassword: false});
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
    Username: "",
    email: "",
    password: "",
    cpassword: ""
  }});

  console.log(errors);

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold ">Register</h1>
        </div>
        <form onSubmit={handleSubmit((data) => {
          console.log(data);
        })} className="flex flex-col gap-5">
          <div className={styles.input_group}>
            <input
              type="text"
              {...register("Username", {required: 'Required.'})}
              placeholder="Username"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-3 ">
              <p>{errors.Username?.message}</p>
              <HiUser size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type="email"
              {...register("email", {required: 'Required.'})}
              placeholder="Email"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-3 ">
              <p>{errors.email?.message}</p>
              <HiAtSymbol size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.password ? "text" : "password"}`}
              {...register("password", {required: 'Required.'})}
              placeholder="Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-3"
              onClick={() => setShow({...show, password: !show.password})}
            >
              <p>{errors.password?.message}</p>
              {show.password ? <HiEye size={20} /> : <HiEyeOff size={20} />}
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              {...register("cpassword", {required: 'Required.'})}
              placeholder="Confirm Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-3"
              onClick={() => setShow({...show, cpassword: !show.cpassword})}
            >
              <p>{errors.cpassword?.message}</p>
              {show.cpassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
            </span>
          </div>
          <div>
            <button type="submit" className={styles.button}>Sign Up</button>
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
