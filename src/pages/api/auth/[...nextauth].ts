import { comparePasswords } from "@/configs/bcript/hash";
// import { User } from "@prisma/client";
import {User} from "@/types/ads";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/configs/prisma/prisma";

export default NextAuth({
  
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({

      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Username & Password",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "username", type: "text", placeholder: "" },
        password: { label: "password", type: "password" },
      },
      
      async authorize(credentials) {
        if (credentials == null) return null;
        console.log("req user")
        const res = (await axios.get(
          `${process.env.DOMAIN}/api/user/get_account`,
          {
            params: { name: credentials.username },
          }
        ));
        if (res.data == null) return null;
        if ("error" in res.data) return null;

        const user = res.data;
        console.log('user',user.userData)
        // console.log('pass',user.hash)
        const isMatch = await comparePasswords(credentials.password, user.userData.hash);
        if (!isMatch) return null;

        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.api_key = user.api_key;
        token.model = user.model;
      }
      return token;
    },
    async session({ session, token }) {
      if ("model" in token) {
        session.user.name = token.name as string;
        session.user.api_key = token.api_key as string | null;
        session.user.model = token.model as string;
      }
      return session;
    },
  },
});
