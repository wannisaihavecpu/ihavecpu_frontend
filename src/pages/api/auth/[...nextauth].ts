// Import necessary modules
// import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import axios from "axios";

// Define your API route function
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
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

        if (apiResponse.data.res_code === "00") {
          return apiResponse.data.res_result;
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async signIn({ account, profile,user }) {
      console.log("account1",account);
      console.log("profile1",profile);
      // If a user is signed in with credentials, return true
      if (account?.provider === 'credentials') {
        // account.provider = account.provider;
        return true;
      }
    
      // If a user is signed in with Google, handle the sign-in logic
      if (account?.provider === 'google') {
        const formData = new FormData();
        formData.append("type", "3");
        formData.append("email", profile.email);
        formData.append("name", profile.name);
        formData.append("uuid", profile.sub);
    
        try {
          // Checklogin for Google sign-in
          const checkLoginFormData = new FormData();
          checkLoginFormData.append("type", "3");
          checkLoginFormData.append("email", profile.sub);
    
          const checkLoginResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_PATH}/auth/checklogin`,
            checkLoginFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          console.log('Checklogin API Response:', checkLoginResponse);
    
          if (checkLoginResponse.data.res_code === "00") {
            // Include additional data in the JWT token
            // const token = {
            //   accessToken: account.access_token,
            //   user: { ...profile, ...checkLoginResponse.data.res_result },
            // };
            account.user = checkLoginResponse.data.res_result;
            return true;
          } else {
            account.user = checkLoginResponse.data.res_result;
            return true;
          }
        } catch (error) {
          console.error('Error during checklogin:', error);
          return Promise.resolve(null);
        }
      }
    
      // Return false for other providers
      return false;
    },  
    async jwt({ token, user, account }) {
      console.log("user12", user);
      console.log("account12", account);
      console.log("token12", token);


      if (account?.provider === 'google') {
        // token.accessToken = account.access_token;
        token.user = account.user;
      } else if (account?.provider === 'credentials'){
        token.user = user;
      }
      return token;
    }, 

    // for save user response to session (token is from response)
    async session({user, session, token }) {
      console.log("user2", user);

      console.log("session2", session);

      console.log("token2", token);
      // session.accessToken = token.token_expire;
      session.user = token.user;

      return session;
    },
  },
  // pages: {
  //   signIn: "/",
  // },
});
