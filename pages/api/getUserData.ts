import { regis_data, user_data } from "@/layout/type";
import handleRegister from "./handleRegister";

export default async function getUserData(email: string) {
    const options = {
        headers: {
          "x-hasura-admin-secret":
            "Yd76CQA8cgXTe1vc5bRXhnLJxGaamQtwZy8aHPUctmqXQKdI7DWs9pNDAo6EBeFB",
        },
        method: "POST",
        body: JSON.stringify({
          query: `query getUserData($email: String!) {
                user_by_pk(email: $email) {
                  email
                  userID
                  username
                }
              }`,
          variables: {
            email: email,
          },
        }),
      };
    const response:Response = await fetch(
        "https://enhanced-chicken-26.hasura.app/v1/graphql",
        options
      )
      const responseJson = await response.json();
      if (responseJson.data.user_by_pk != null) {
        const data: user_data = responseJson.data.user_by_pk
        return data;
      } else {
        if (responseJson.data.user_by_pk == null) {
            console.log("add New user");
            const data: regis_data =  {
                username: null,
                email: email,
                password: null,
                cpassword: null,
            }
            const register_response = await handleRegister(data, "google");
            console.log(register_response);
            if (!register_response) {
              getUserData(email);
            }
            else {
              throw new Error('Something went wrong');
            }
        }
        else {
          throw new Error('Something went wrong');

        }
      }
      
    }