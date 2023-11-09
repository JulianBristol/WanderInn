import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb"

//Gets the user's current session from the server
export async function getSession() {
    return await getServerSession(authOptions)
}

//basically returns a cleaned session that ensures that it contains a validated active session, not an errored session
export default async function getCurrentUser() {
    try{
        const session = await getSession();

        if (!session?.user?.email){
            return null;
        }
        
        const currentUser = await prisma.user.findUnique({
            where: {
                //we cast session.user.email to a string because prisma does not allow the user of null or undefined values in where clauses
                email: session.user.email as string
            }
        })

        //if the current user does not exist in the database
        if (!currentUser){
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    }catch(err: any){
        return null;
    }
}