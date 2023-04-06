import getJWT from "./getJWT";

export default async function handleGetTodo(email: string) {
  const user_jwt = await getJWT(email);
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
                userEmail
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
  return responseJson.data.todos;
}
