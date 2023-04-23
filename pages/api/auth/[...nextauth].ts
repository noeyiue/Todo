import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import handleLogin from "../handleLogin";



export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // Implement your own authorization logic here
        const { email , password } = credentials;

        const result = await handleLogin(email, password);
        console.log(result);


        if (result != null) {
          return { email };
        } else {
          throw new Error("Incorrect email or password");
        }
      },
    }),
  ],
});
