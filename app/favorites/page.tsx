import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();

    if (!currentUser){
        <ClientOnly>
            <EmptyState
                title='Unauthorized'
                subtitle='Please log in to see your favorites'
            />
        </ClientOnly>
    }

    if (listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favorite Listings Found"
                    subtitle='You have not added any listings to your favorites yet...'
                />
            </ClientOnly>
        )
    }
  
    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default FavoritesPage;
