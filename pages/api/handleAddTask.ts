import getJWT from "./getJWT";

export default async function handleAddTask(userID: string, input: string) {
  const user_jwt = await getJWT(userID);
  const options = {
    headers: {
      Authorization: "Bearer " + user_jwt,
    },
    method: "POST",
    body: JSON.stringify({
      query: `mutation addNewTask($task: String!, $userID: String!) {
            insert_todos(objects: {task: $task, userID: $userID}) {
                returning {
                    isEdit
                    isFinish
                    task
                    taskID
                    userID
                }
            }
        }`,
      variables: {
        task: input,
        userID: userID
      },
    }),
  };
  const fetchResponse = await fetch(
    "https://enhanced-chicken-26.hasura.app/v1/graphql",
    options
  );
  const responseJson = await fetchResponse.json();
  // console.log(responseJson);

  if (responseJson.errors) {
    console.log(responseJson);
    throw new Error('Something wrong');
  }
  else {
    return responseJson.data;
  }
}
