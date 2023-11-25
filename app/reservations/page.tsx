import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please log in to see more"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Reservations Found"
                    subtitle="No users have reserved your listings yet..."
                />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <div>
                <ReservationsClient
                    reservations={reservations}
                    currentUser={currentUser}
                />
            </div>
        </ClientOnly>
    )
}

export default ReservationsPage;