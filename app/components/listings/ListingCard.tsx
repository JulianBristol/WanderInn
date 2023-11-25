"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import React, { FC, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation"
import useCountries from "@/app/hooks/useCountries";
import { format } from "date-fns";
import Image from "next/image"
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?:  (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    /* since location data is stored as a small string to save data,
    we recreate the location data here
    FUTURE: Switch to latlng data being stored */
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if(disabled){
                return;
            }

            onAction?.(actionId);
    },[onAction, disabled, actionId])

    // if the user has a reservation, returns the updated reservation price
    //otherwise, returns the default price per night
    const price = useMemo(() => {
        if(reservation){
            return reservation.totalPrice
        }
        return data.price;
    },[data.price, reservation])

    // if the user has a reservation, returns the updated reservation price
    //otherwise, returns the default price per night
    const reservationDate = useMemo(() => {
        if(!reservation){
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    },[reservation])

    return (
        <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className="
            col-span-1
            cursor-pointer
            border-2
            rounded-xl
            p-2
            hover:border-tahiti-600
            hover:bg-tahiti-100/20
            transition
            group
        "
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                ">
                    <Image
                        alt="Listing"
                        src={data.imageSrc}
                        fill
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, <span className="group-hover:text-tahiti-900">{location?.label}</span>
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex-row flex items-center gap-1">
                    <div className="font-semibold group-hover:text-tahiti-900">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default ListingCard;