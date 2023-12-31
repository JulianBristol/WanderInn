import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(
    params: IListingsParams
) {
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue
        }

        if (category) {
            query.category = category
        }

        if (startDate && endDate) {
            // ensures that reservation times are not conflicting
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            }
                        ]
                    }
                }
            }
        }

        //gets all listings ordered by creation datetime
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        })

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeListings;
    } catch (err: any){
        throw new Error(err);
    }
}