import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID as string,
      clientSecret: process.env.YANDEX_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt callback", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    async session({ session, token }) {
      // console.log("session callback", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
