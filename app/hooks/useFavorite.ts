import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    //checks if listing is in the user favorites
    const hasFavorited = useMemo(() => {
       const list = currentUser?.favoriteIds || [];

       return list.includes(listingId)
    },[currentUser, listingId])

    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        //stops the initial action of the mouse event
        e.stopPropagation();

        //open login modal if not signed in
        if (!currentUser){
            return loginModal.onOpen()
        }

        try {
            let request;

            if (hasFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }
            
            await request();
            router.refresh();
            if (hasFavorited){
                toast.success("Removed from favorites")
            } else {
                toast.success("Added to favorites")
            }
        } catch (error) {
            toast.error("Something went wrong...")
        }
    },[currentUser, hasFavorited, listingId, loginModal, router])

    return {hasFavorited, toggleFavorite}
}

export default useFavorite;