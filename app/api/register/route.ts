import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    //the request is passed to the POST function
    request: Request
){
    //turns the request into a json object
    const body = await request.json();
    const {
        email,
        name, 
        password
    } = body;

    //runs the password through bcrypt's hashing algorithm 
    const hashedPassword = await bcrypt.hash(password, 12);

    //creates a Prisma user record with the email, name, and bcypt's hashed password
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    //simply returns a new JSON object with the data in the user object
    return NextResponse.json(user)
}