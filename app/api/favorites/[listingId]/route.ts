import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    //ensure user is signed in
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    //append the current listingId from the route unto the favoriteIds array
    favoriteIds.push(listingId);

    //update database with the recent change to favorites 
    const user = await prisma.user.update({
        //finds the document in MongoDB
        where: {
            id: currentUser.id
        },
        //updates the data in MongoDB
        data: {
            favoriteIds: favoriteIds
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(
    request: Request,
    { params } : { params: IParams }
){
    const currentUser = await getCurrentUser();

    if (!currentUser){
        return NextResponse.error()
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds
        }
    })

    return NextResponse.json(user);
}