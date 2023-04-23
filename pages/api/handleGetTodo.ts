import getJWT from "./getJWT";

export default async function handleGetTodo(userID: string) {
  const user_jwt = await getJWT(userID);
  const options = {
    headers: {
      Authorization:
        "Bearer " + user_jwt
    },
    method: "POST",
    body: JSON.stringify({
      query: `query fetchAllTask {
            todos {
                isEdit
                isFinish
                task
                taskID
                userID
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
  // console.log(responseJson);
  if (responseJson.errors) {
    console.log(responseJson);
    throw new Error('Something wrong');
  }
  else {
    return responseJson.data.todos;
  }
}
