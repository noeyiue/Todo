import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import { useForm } from "react-hook-form";

import styles from "../styles/Form.module.css";

import Image from "next/image";
import { HiAtSymbol, HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";

import { signIn } from "next-auth/react";



export default function Login() {
  const [show, setShow] = useState<boolean>(false);

  // Google Handler
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000/" });
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Get Start</h1>
          <p className="w-3/4 mx-auto text-gray-400">Todo App with CRUD.</p>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="flex flex-col gap-5"
        >
          <div className={styles.input_group}>
            <input
              type="email"
              {...register("username", { required: "Required" })}
              placeholder="Email"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-3 ">
              <p>{errors.username?.message}</p>
              <HiAtSymbol size={20} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show ? "text" : "password"}`}
              {...register("password", { required: "Required" })}
              placeholder="Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-3"
              onClick={() => setShow(!show)}
            >
              <p>{errors.password?.message}</p>
              {show ? <HiEye size={20} /> : <HiEyeOff size={20} />}
            </span>
          </div>
          <div>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_provider}
            >
              Sign in with Google{" "}
              <Image
                src={"/assets/google.svg"}
                height="20"
                width="20"
                alt="google"
              ></Image>
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400">
          don't have an account yet?{" "}
          <Link href={"register"} className="text-blue-500">
            Sign up
          </Link>
        </p>
      </section>
    </Layout>
  );
}
