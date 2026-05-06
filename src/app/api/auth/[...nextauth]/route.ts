import NextAuth, { NextAuthOptions } from "next-auth";
// We use a dummy import for PrismaAdapter since we just installed it but the setup might be incomplete.
// Normally: import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "@/lib/prisma"
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials";

// TODO: Replace with actual Prisma client import when DB is up
const mockPrismaAdapter = {} as any;

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Uncomment when DB is connected
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-secret",
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.YANDEX_CLIENT_SECRET || "mock-secret",
    }),
    CredentialsProvider({
      name: "Email / Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "ceo@erlikh.ai" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization for development
        if (credentials?.email === "ceo@erlikh.ai" && credentials?.password === "admin") {
          return { id: "1", name: "Andrei Erlikh", email: "ceo@erlikh.ai", role: "admin" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt", // Use JWT for easier scaling unless DB session is strictly required
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Attach user ID from token to session
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom login page Claude is building
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
