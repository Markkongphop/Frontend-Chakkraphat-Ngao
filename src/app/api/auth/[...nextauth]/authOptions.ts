// src/app/api/auth/[...nextauth]/authOptions.ts

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/db/models/User";
import { dbConnect } from "@/db/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Telephone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        await dbConnect();

        try {
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

          // Generate JWT token
          const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: '30d' }
          );

          // Return user data with token (Corrected property name)
          const { password, ...userData } = user.toObject();
          return { ...userData, accessToken: token }; // Changed token to accessToken
        } catch (error) {
          console.error("Error during authorization:", error);
          return null; // Handle errors gracefully by returning null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            return { ...token, ...user };
        }
        return token;
    },
    async session({ session, token }) {
        session.user = token as any; // Ensure token is sent to client
        return session;
    },
},
};