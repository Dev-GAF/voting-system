import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import argon2 from "argon2";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",
    },

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),

        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                const email = credentials.email as string;
                const password = credentials.password as string;

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (user===null) return null;

                if (!user.passwordHash) return null;

                const passwordValid = await argon2.verify(user.passwordHash, password);

                if (!passwordValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id;
                token.username = user.username ?? null;
            }

            return token;
        },

        async session({ session, token }) {

            if (session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string | null;
            }

            return session;
        },
    },

    secret: process.env.AUTH_SECRET,
});