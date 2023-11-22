import { Listing, User } from "@prisma/client";

//the Omit just removes that data from the type and allows you to replace
//it with defined types
export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createAt: string;
}