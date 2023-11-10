import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // Authentication using credentials provided by github and google sign in
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // Authentication using credentials provided by the user based on old-school email and password
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials){
                // if the user did not provide an email or password throw an error
                if (!credentials?.email || !credentials?.password){
                    throw new Error("Invalid credentials")
                }
                //look for the user inside the database using prisma
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                //if the user does not exist or they do not have a password (remember password is optional so we need to ensure that it exists in order to authenticate the user) throw an error
                if (!user || !user?.hashedPassword){
                    throw new Error("Invalid credentials");
                }

                // use bcrypt to confirm that there is a password match
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword){
                    throw new Error("Invalid credentials");
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)