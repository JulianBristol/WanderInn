"use client";

import React, { FC } from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const {hasFavorited, toggleFavorite} = useFavorite({
        listingId,
        currentUser
    });

    return (
        <div
        onClick={toggleFavorite}
        className="
            relative
            hover:opacity-80
            transition
            cursor-pointer
        "
        >
            <AiOutlineHeart
                className="
                fill-white
                absolute
                -top-[2px]
                -right-[2px]
                "
                size={28}
            />
            <AiFillHeart
                className={hasFavorited ? "fill-tahiti-600" : "fill-neutral-500/70"}
                size={24}
            />
        </div>
    )
}

export default HeartButton;