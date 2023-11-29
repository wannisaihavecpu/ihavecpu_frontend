import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface user {
    customer_id?: number;
    customer_code?: string;
    email?: string;
    customer_name?: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    remember_token?: string;
    token_expire?: string;
  }

  interface Session extends DefaultSession {
    user?: user;
  }
}
