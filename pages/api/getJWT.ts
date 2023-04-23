export default async function getJWT(userID: string) {
  const sign = require("jwt-encode");
  const secret = "3EK6FD+o0+c7tzBNVfjpMkNDi2yARAAKzQlk8O2IKoxQu4nF7EdAh8s3TwpHwrdWT6R";
  const data = {
    "https://hasura.io/jwt/claims" : {
       "x-hasura-allowed-roles": ["user","admin"],
       "x-hasura-default-role": "user",
       "x-hasura-user-id": userID
    }
  };
  const jwt = sign(data, secret);
  return jwt;
}
