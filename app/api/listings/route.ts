import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    //the request is passed to the POST function
    request: Request
){
    //gets the user session info
    const currentUser = await getCurrentUser();

    //if there is no user, return an error and exit
    if (!currentUser) {
        return NextResponse.error();
    }

    //get the body data sent from the url
    const body = await request.json();

    //destructure the body data from the body
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    /* validate that no body data is missing. This is a necessary step to ensure 
    that users did not skip placing information or if a bad actor attempted to input
    missing data
    Object.keys(body).forEach((value:any) => {
        if(!body[value]){
            NextResponse.error();
        }
    }) */

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
}