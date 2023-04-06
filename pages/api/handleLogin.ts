import { login_data } from "@/layout/type";


export default async function handleLogin(data: login_data) {
  const { createHash } = require('crypto');
  function hash(string: string) {
    return createHash('sha256').update(string).digest('hex');
  }
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
              password
            }
          }`,
          variables: {
            email: data.email
          }
        }),
      };
    
      const response: Response = await fetch(
        "https://enhanced-chicken-26.hasura.app/v1/graphql",
        options
      );
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.data.user_by_pk == null) {
        return true;
      } else {
        const input_pass: String = hash(data.password);
        const true_pass: String = responseJson.data.user_by_pk.password;
        if (input_pass == true_pass) {
          return false;
        } else {
          return true;
        }
      }
}