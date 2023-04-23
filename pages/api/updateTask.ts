import getJWT from "./getJWT";

export default async function updateTask(userID: string, taskID: string, editText: string) {
  const user_jwt = await getJWT(userID);
  const options = {
    headers: {
      Authorization: "Bearer " + user_jwt,
    },
    method: "POST",
    body: JSON.stringify({
      query: `mutation updateTask($userID: String!, $taskID: uuid!, $task: String!) {
        update_todos_by_pk(pk_columns: {userID: $userID, taskID: $taskID}, _set: {task: $task}){
            isEdit
            isFinish
            task
            taskID
            userID
          }
        }`,
      variables: {
        userID: userID, 
        taskID: taskID, 
        task: editText
      },
    }),
  };
  const fetchResponse = await fetch(
    "https://enhanced-chicken-26.hasura.app/v1/graphql",
    options
  );
  const responseJson = await fetchResponse.json();
  if (responseJson.errors) {
    console.log(responseJson);
    throw new Error('Something wrong');
  }
  else {
    console.log(responseJson.data);
    return responseJson.data;
  }
}
