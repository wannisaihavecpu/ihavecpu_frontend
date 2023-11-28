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
      credentials: {
        type: { label: "Type", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
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
            return {
              customer_id: apiResponse.data.res_result.customer_id,
              customer_name: apiResponse.data.res_result.customer_name,
              email: apiResponse.data.res_result.email,
              token_expire: apiResponse.data.res_result.token_expire,
            };
          } else {
            throw new Error("Invalid credentials");
            // return { error: "Invalid credentials" };
          }

          return null;
        } catch (error) {
          // console.error("Error during authentication:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({ token, account }) {
      // console.log(token);
      // console.log(account);
      if (account) {
        // console.log(account);
        token.accessToken = account.access_token;
        // token.id = profile.id
      }
      return token;
    },
    // async session({ session, token, user }) {
    //   session.token_expire = token.accessToken;
    //   session.user.id = token.id;

    //   return session;
    // },
  },
  // pages: {
  //   signIn: "/",
  // },
});
