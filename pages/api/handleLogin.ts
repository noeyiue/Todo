export default async function handleLogin(
  useremail: string,
  userpassword: string
) {
  function hash(string: string) {
    const { createHash } = require("crypto");
    return createHash("sha256").update(string).digest("hex");
  }
  const formPassword = hash(userpassword);
  //get password
  const options = {
    headers: {
      "x-hasura-admin-secret":
        "Yd76CQA8cgXTe1vc5bRXhnLJxGaamQtwZy8aHPUctmqXQKdI7DWs9pNDAo6EBeFB",
    },
    method: "POST",
    body: JSON.stringify({
      query: `query getPassword($email: String!) {
            user_by_pk(email: $email) {
              email
              password
              userID
              username
            }
          }`,
      variables: {
        email: useremail,
      },
    }),
  };

  const response: Response = await fetch(
    "https://enhanced-chicken-26.hasura.app/v1/graphql",
    options
  );
  const responseJson = await response.json();
  if (responseJson.data.user_by_pk == null) {
    return null;
  } else {
    if (responseJson.data.user_by_pk.password == formPassword) {
      return responseJson.data.user_by_pk.email;
    } else {
      return null;
    }
  }
}
