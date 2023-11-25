import prisma from "@/app/libs/prismadb"

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
){
    try {
        const { listingId, userId, authorId } = params;

        // Uses the params to change the query search
        const query: any = {};

        // Used to find all the reservations for the given WanderInn home listing
        if (listingId) {
            query.listingId = listingId;
        }

        // Used to find all the trips a user has reserved 
        if (userId) {
            query.userId = userId;
        }

        // Used to find all the reservations other users have made for our listings
        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        }))

        return safeReservations;
    } catch (error: any){
        throw new Error(error)
    }
}