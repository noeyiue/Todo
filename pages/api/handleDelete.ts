import getJWT from "./getJWT";

export default async function handleDelete(userID: string, deleteID: string) {
    const user_jwt = await getJWT(userID);
    const options = {
        headers: {
        Authorization: "Bearer " + user_jwt,
    },
      method: "POST",
      body: JSON.stringify({
        query: `mutation deleteTask($userID: String!, $taskID: uuid!) {
          delete_todos_by_pk(userID: $userID, taskID: $taskID) {
            userID
            taskID
            task
          }
        }`,
        variables: {
            userID: userID,
            taskID: deleteID
        },
      }),
    };

    const response = await fetch(
      "https://enhanced-chicken-26.hasura.app/v1/graphql",
      options
    );
    const responseJson = await response.json();
    if (responseJson.errors) {
        console.log(responseJson);
        throw new Error('Something wrong');
      }
      else {
        console.log(responseJson.data);
        return responseJson.data;
      }
  }