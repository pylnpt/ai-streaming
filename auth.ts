import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db) as any,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }

      if (session.user) {
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }

      return session;
    },
    async jwt({ token, user, account, trigger }) {
      // On initial sign in with OAuth
      if (account && account.provider !== "credentials") {
        // Find the user by email since OAuth might not provide the DB user ID
        if (token.email) {
          const existingUser = await db.user.findUnique({
            where: { email: token.email },
          });

          if (existingUser) {
            token.id = existingUser.id;
            token.username = existingUser.username;
            token.picture = existingUser.image;
          }
        }
      }

      // On initial sign in with credentials, user object contains all data
      if (user && account?.provider === "credentials") {
        token.id = user.id;
        token.username = (user as any).username;
        token.email = user.email;
        token.picture = user.image;
      }

      // On subsequent requests, token.id should already be set
      // Optionally refresh user data
      if (token.id && trigger === "update") {
        const existingUser = await db.user.findUnique({
          where: { id: token.id as string },
        });

        if (existingUser) {
          token.username = existingUser.username;
          token.email = existingUser.email;
          token.picture = existingUser.image;
        }
      }

      return token;
    },
    async signIn({ user, account, profile }) {
      // For OAuth providers, create user with username if it doesn't exist
      if (account?.provider !== "credentials") {
        if (!user.email) return false;

        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        // If user doesn't exist, create one with a username from email or profile
        if (!existingUser && user.email) {
          const username =
            (profile as any)?.login || // GitHub username
            user.email.split("@")[0]; // Fallback to email prefix

          await db.user.create({
            data: {
              email: user.email,
              username: username,
              image: user.image,
              stream: {
                create: {
                  name: `${username}'s stream`,
                },
              },
            },
          });
        }

        // If user exists but doesn't have this OAuth account linked, link it
        if (existingUser && account) {
          const existingAccount = await db.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          // Only create account if it doesn't exist yet
          if (!existingAccount) {
            await db.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state as string | null,
              },
            });
          }
        }
      }

      return true;
    },
  },
  ...authConfig,
});
