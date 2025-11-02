import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username: string;
  }
}
