// Import necessary modules
// import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Define your API route function
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        type: { label: "Type", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const formData = new FormData();
        formData.append("type", "1");
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);

        const apiResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_PATH}/auth/checklogin`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(formData);

        if (apiResponse.data.res_code === "00") {
          return apiResponse.data.res_result;
        } else {
          console.log("in to the");
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("user", user);
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("session", session);

      console.log("token", token);
      // session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },
  // pages: {
  //   signIn: "/",
  // },
});
