import getJWT from "./getJWT";

export default async function handleAddTask(email: string, input: string) {
  const user_jwt = await getJWT(email);
  const options = {
    headers: {
      Authorization: "Bearer " + user_jwt,
    },
    method: "POST",
    body: JSON.stringify({
      query: `mutation addNewTask($task: String!, $email: String!) {
            insert_todos(objects: {task: $task, userEmail: $email}) {
                returning {
                    isEdit
                    isFinish
                    task
                    taskID
                    userEmail
                }
            }
        }`,
      variables: {
        task: input,
        email: email
      },
      opretionName: "addNewTask",
    }),
  };
  const fetchResponse = await fetch(
    "https://enhanced-chicken-26.hasura.app/v1/graphql",
    options
  );
  const responseJson = await fetchResponse.json();
  return responseJson.data;
}
