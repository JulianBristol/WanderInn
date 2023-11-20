import prisma from "@/app/libs/prismadb";

export default async function getListings() {
    try {
        //gets all listings ordered by creation datetime
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return listings;
    } catch (err: any){
        throw new Error(err);
    }
}