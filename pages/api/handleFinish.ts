import getJWT from "./getJWT";

export default async function handleFinish(userID: string, taskID: string, isFinish: boolean) {
  const user_jwt = await getJWT(userID);
  const options = {
    headers: {
      Authorization: "Bearer " + user_jwt,
    },
    method: "POST",
    body: JSON.stringify({
      query: `mutation updateFinishTask($userID: String!, $taskID: uuid!, $isFinish: Boolean!) {
        update_todos_by_pk(pk_columns: {userID: $userID, taskID: $taskID}, _set: {isFinish: $isFinish}) {
            isFinish
          }
        }`,
      variables: {
        userID: userID, 
        taskID: taskID, 
        isFinish: !isFinish
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

