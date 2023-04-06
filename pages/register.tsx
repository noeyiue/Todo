import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import { useForm } from "react-hook-form";


import styles from "../styles/Form.module.css";

import { HiAtSymbol, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import { useState } from "react";

import handleRegister from "./api/handleRegister";
import { useRouter } from "next/router";


export default function Register() {
  const [error, setError] = useState(false);
  const router = useRouter();
  const { createHash } = require('crypto');
  function hash(string: string) {
    return createHash('sha256').update(string).digest('hex');
  }

  const [show, setShow] = useState({ password: false, cpassword: false });
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const password = watch("password");
  const cpassword = watch("cpassword");

  console.log(errors);

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold pb-0.5">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">Todo App with CRUD.</p>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            data.password = hash(data.password);
            console.log(data);
            const result = await handleRegister(data);
            console.log(result);
            setError(!!result);
            if (!result) {
              router.push("login");
            }

          })}
          className="flex flex-col gap-4"
        >
          <div className={styles.input_group}>
            <input
              type="text"
              {...register("username", { required: "Required" })}
              placeholder="Username"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-3 ">
              <p>{errors.username?.message}</p>
              <HiUser size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type="email"
              {...register("email", { required: "Required" })}
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
              {...register("password", { required: "Required" })}
              placeholder="Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-3"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <p>{errors.password?.message}</p>
              {show.password ? <HiEye size={20} /> : <HiEyeOff size={20} />}
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              {...register("cpassword", { required: "Required", validate: (value) =>
              value === password || "Passwords do not match", })}
              placeholder="Confirm Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-3"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <p>{errors.cpassword?.message}</p>
              {show.cpassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
            </span>
          </div>
          {error && <p className="text-indigo-500">Email or username already exists.</p>}
          <div>
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
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
