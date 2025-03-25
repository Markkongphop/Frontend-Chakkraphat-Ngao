// src/app/api/auth/[...nextauth]/authOptions.ts

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/User"; // Import your User model
import { dbConnect } from "@/db/dbConnect"; // Import your dbConnect function
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Telephone", type: "text", placeholder: "email or telephone" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        await dbConnect();

        const user = await User.findOne({
          $or: [{ email: credentials.identifier }, { telephone: credentials.identifier }],
        }).select('+password');

        if (!user) {
          return null;
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isMatch) {
          return null;
        }

        // Return user data without the password
        const { password, ...userData } = user.toObject();
        return userData;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};