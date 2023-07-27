/* eslint-disable */
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      api_key: string | null;
      model: string;
    };
  }
  interface User {
    id: string;
    name: string;
    hash: string;
    api_key: string | null;
    model: string;
  }
  interface AdapterUser {
    id: string;
    name: string;
    hash: string;
    api_key: string | null;
    model: string;
  }
}
