import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from 'next';
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useSession, getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import handleGetTodo from "./api/handleGetTodo";
import handleAddTask from "./api/handleAddTask";



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
      <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col items-center justify-center">
        {session ? <User session={session} handleSignOut={handleSignOut}/> : <Guest />}
      </div>
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
  const [tasks, setTasks] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {

    getTodo();
  }, [tasks]);

  async function getTodo() {
    const data = await handleGetTodo(session.user.email);
    setTasks(data);
  }
  
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  

  return (
    <>
    <div className="mx-auto max-w-md max-h-md shadow-2xl place-items-center w-3/4  p-7 rounded-lg bg-white">
      <h1>{session.user?.email}</h1>
        <h1 className="font-bold mb-4 text-4xl">
          <FontAwesomeIcon icon={icon({ name: "list" })} /> Todo List{" "}
        </h1>
        <div className="flex">
          <input
            className="border border-gray-400 mr-2 px-4 py-2 flex-grow rounded"
            type="text"
            placeholder="Enter your TODO item"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
            onClick={ async () => {
              const result = await handleAddTask(session.user.email, inputValue);
              setInputValue("");
            }}
          >
            <FontAwesomeIcon
              icon={icon({ name: "circle-plus" })}
              className="mr-2 h-30px"
            />
            Add
          </button>
        </div>

        <ul className="list-disc list-inside my-4">
          {tasks
            .filter((task) => task.isFinish === false)
            .map((task) => (
              <li
                key={task.taskID}
                className="flex justify-between items-center mb-2"
              >
                {!task.isEdit && (
                  <div>
                    <input
                      type="checkbox"
                      checked={task.isFinish}
                      className="form-checkbox mb-2 mx-1 text-blue-600"
                      // onChange={() => handleFinish(task.taskID, task.isFinish)}
                    />
                    {task.task}
                  </div>
                )}
                {task.isEdit && (
                  <input
                    type="text"
                    className="border border-red-400 px-1 flex-grow rounded "
                    placeholder={task.Task}
                    // onChange={(event) => setEditText(event.target.value)}
                  />
                )}
                <div>
                  {!task.isEdit && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 mx-1 rounded"
                      // onClick={() => handleEdit(task.taskID)}
                    >
                      <FontAwesomeIcon
                        icon={icon({ name: "pen-to-square" })}
                        className="mr-2"
                      />
                      Update
                    </button>
                  )}
                  {task.isEdit && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 mx-1 rounded"
                      onClick={(event) => {
                        // updateTask(task.taskID, editText);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={icon({ name: "check" })}
                        className="mr-2"
                      />
                      Submit
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
                    // onClick={() => handleDelete(task.taskID)}
                  >
                    <FontAwesomeIcon icon={icon({ name: "trash" })} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        {tasks.length > 0 && (
          <h1>
            Completed ({tasks.filter((task) => task.isFinish === true).length} /{" "}
            {tasks.length})
          </h1>
        )}
        <ul className="list-disc list-inside my-4">
          {tasks
            .filter((task) => task.isFinish === true)
            .map((task) => (
              <li
                key={task.taskID}
                className="flex justify-between items-center mb-2"
              >
                <div className="line-through">
                  <input
                    type="checkbox"
                    checked={task.isFinish}
                    className="form-checkbox mb-2 mx-1 text-blue-600"
                    // onChange={() => handleFinish(task.taskID, task.isFinish)}
                  />
                  {task.task}
                </div>

                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
                  // onClick={() => handleDelete(task.taskID)}
                >
                  <FontAwesomeIcon icon={icon({ name: "trash" })} />
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-md bg-slate-50 text-indigo-500" >Sign Out</button>
      </div>
      </>
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