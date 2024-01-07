// import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from 'next-auth/providers/facebook';

import axios from "axios";

async function checkToken(token) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/auth/checkToken`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.res_code === "00") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
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
      if (account?.provider === 'credentials') {
        // account.provider = account.provider;
        return true;
      }
    
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
    
          // console.log('Checklogin API Response:', checkLoginResponse);
    
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
      if (account?.provider === 'facebook') {
        // console.log("facebook", {
        //   account, profile,user
        // })
      }
    
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

    async session({ session, token }: { user: any; session: any; token: any }) {
      // console.log("user2", user);
      // console.log("session2", session);
      // console.log("token2", token);
      // if(token){
      //   const isTokenValid = await checkToken(token.user.token_expire);
      //   if (!isTokenValid) {
      //     console.log("token is expired");
      //     return null;
      //   } else {
      //     console.log("no valid token");
      //   }
      // }
      // session.accessToken = token.token_expire;
      session.user = token.user;

      return session;
    },
  },
  // pages: {
  //   signIn: "/",
  // },
});
