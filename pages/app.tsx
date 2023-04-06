import Head from "next/head";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function App() {
  
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [editText, setEditText] = useState("");

  async function getAllTodo() {
    const options = {
      headers: {
        "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoidXNlcjEifX0.aWJMoctQ7-a8JiZd4oMjo0KdPIeohLmjAWIQFDiTwUY"
      },
      method: "POST",
      body: JSON.stringify({
        query: `query fetchAllTasks {
          todos {
            isFinish
            task_id
            todo_task
            user_id
            isEdit
          }
        }`,
        opretionName: "fetchAllTask",
      }),
    };
    const fetchResponse = await fetch(
      "https://enhanced-chicken-26.hasura.app/v1/graphql",
      options
    );
    const responseJson = await fetchResponse.json();
    setTasks(responseJson.data.todos);
  }

  async function addTodo(inputValue: string) {
    const options = {
      headers: {
        "x-hasura-admin-secret":
          "Yd76CQA8cgXTe1vc5bRXhnLJxGaamQtwZy8aHPUctmqXQKdI7DWs9pNDAo6EBeFB",
      },
      method: "POST",
      body: JSON.stringify({
        query: `mutation addTask($task: String!) {
          insert_TodoTask(objects: {Task: $task}) {
            returning {
              Task
              id
            }
          }
        }`,
        variables: {
          task: inputValue,
        },
      }),
    };

    const response = await fetch(
      "https://enhanced-chicken-26.hasura.app/v1/graphql",
      options
    );
    const responseJson = await response.json();
    const newTask = responseJson.data.insert_TodoTasks.returning[0];
    getAllTodo();
    setInputValue("");
  }

  async function deleteTodo(deleteID: number) {
    const options = {
      headers: {
        "x-hasura-admin-secret":
          "Yd76CQA8cgXTe1vc5bRXhnLJxGaamQtwZy8aHPUctmqXQKdI7DWs9pNDAo6EBeFB",
      },
      method: "POST",
      body: JSON.stringify({
        query: `mutation deleteTask($id: Int!) {
          delete_TodoTasks_by_pk(id: $id) {
            id
            Task
            isEdit
    	      isFinish
          }
        }`,
        variables: {
          id: deleteID,
        },
      }),
    };

    const response = await fetch(
      "https://enhanced-chicken-26.hasura.app/v1/graphql",
      options
    );
    const responseJson = await response.json();
    const deletedTask = responseJson.data.delete_TodoTask_by_pk;
    getAllTodo();
  }

  async function updateFinishTask(id: number, isFinish: boolean) {
    const options = {
      headers: {
        "x-hasura-admin-secret":
          "Yd76CQA8cgXTe1vc5bRXhnLJxGaamQtwZy8aHPUctmqXQKdI7DWs9pNDAo6EBeFB",
      },
      method: "POST",
      body: JSON.stringify({
        query: `mutation updateFinishTask($id: Int!, $isFinish: Boolean!) {
          update_TodoTasks_by_pk(pk_columns: {id: $id}, _set: {isFinish: $isFinish}) {
            id
            isFinish
          }
        }`,
        variables: {
          id: id,
          isFinish: !isFinish,
        },
      }),
    };

    const response = await fetch(
      "https://enhanced-chicken-26.hasura.app/v1/graphql",
      options
    );
    const responseJson = await response.json();
    console.log(responseJson);
    getAllTodo();
  }

  async function updateTask(id: number, newtasktext: string) {
    const options = {
      headers: {
        "x-hasura-admin-secret":
          "Yd76CQA8cgXTe1vc5bRXhnLJxGaamQtwZy8aHPUctmqXQKdI7DWs9pNDAo6EBeFB",
      },
      method: "POST",
      body: JSON.stringify({
        query: `mutation updateTask($id: Int!, $Task: String!) {
          update_TodoTask_by_pk(pk_columns: {id: $id}, _set: {Task: $Task}) {
            id
            Task
          }
        }`,
        variables: {
          id: id,
          Task: newtasktext,
        },
      }),
    };

    const response = await fetch(
      "https://enhanced-chicken-26.hasura.app/v1/graphql",
      options
    );
    const responseJson = await response.json();
    console.log(responseJson);
    setEditText("");
    getAllTodo();
  }

  useEffect(() => {
    getAllTodo();
  }, []);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    addTodo(inputValue);
    setInputValue("");
  };

  const handleDelete = (taskID: number) => {
    deleteTodo(taskID);
  };

  const handleFinish = (taskID: number, isFinish: boolean) => {
    updateFinishTask(taskID, isFinish);
  };

  const handleEdit = (id: number) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].isEdit = true;
    setTasks([...tasks]);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center">
      <Head>
        <title>Todo App</title>
      </Head>
      <div className="mx-auto max-w-md max-h-md shadow-2xl place-items-center w-3/4  p-7 rounded-lg bg-white">
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
            onClick={handleAddTodo}
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
                key={task.id}
                className="flex justify-between items-center mb-2"
              >
                {!task.isEdit && (
                  <div>
                    <input
                      type="checkbox"
                      checked={task.isFinish}
                      className="form-checkbox mb-2 mx-1 text-blue-600"
                      onChange={() => handleFinish(task.id, task.isFinish)}
                    />
                    {task.todo_task}
                  </div>
                )}
                {task.isEdit && (
                  <input
                    type="text"
                    className="border border-red-400 px-1 flex-grow rounded "
                    placeholder={task.Task}
                    onChange={(event) => setEditText(event.target.value)}
                  />
                )}
                <div>
                  {!task.isEdit && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 mx-1 rounded"
                      onClick={() => handleEdit(task.id)}
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
                        updateTask(task.id, editText);
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
                    onClick={() => handleDelete(task.id)}
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
                key={task.id}
                className="flex justify-between items-center mb-2"
              >
                <div className="line-through">
                  <input
                    type="checkbox"
                    checked={task.isFinish}
                    className="form-checkbox mb-2 mx-1 text-blue-600"
                    onChange={() => handleFinish(task.id, task.isFinish)}
                  />
                  {task.Task}
                </div>

                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
                  onClick={() => handleDelete(task.id)}
                >
                  <FontAwesomeIcon icon={icon({ name: "trash" })} />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
