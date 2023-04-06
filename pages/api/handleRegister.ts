import { regis_data } from "@/layout/type";


export default async function handleRegister(data: regis_data) {
  const options = {
    headers: {
      "x-hasura-admin-secret":
        "Yd76CQA8cgXTe1vc5bRXhnLJxGaamQtwZy8aHPUctmqXQKdI7DWs9pNDAo6EBeFB",
    },
    method: "POST",
    body: JSON.stringify({
      query: `mutation regisNewUser($email: String!, $password: String!, $username: String!) {
        insert_user(objects: {email: $email, password: $password, username: $username}) {
          returning {
            username
            userID
            email
          }
        }
      }`,
      variables: {
        "email": data.email,
        "password": data.password,
        "username": data.username,
      },
    }),
  };

  const response: Response = await fetch(
    "https://enhanced-chicken-26.hasura.app/v1/graphql",
    options
  );
  const responseJson = await response.json();
  if (responseJson.errors) {
    for (let i = 0; i < responseJson.errors.length; i++) {
      const error = responseJson.errors[i];
      if (
        error.extensions &&
        error.extensions.code === "constraint-violation" &&
        error.message.includes("unique constraint")
      ) {
        console.log("Email or username already exists.");
        // handle uniqueness violation error here
        return true;
      }
    }
    console.log(responseJson.errors);
  } else {
    console.log(responseJson.data);
    return false;
  }
}
