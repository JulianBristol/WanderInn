"use client";

import React from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";

const RentModal = () => {

    const rentModal = useRentModal();

    return (
        <Modal
            title="WanderInn Your Home"
            isOpen={rentModal.isOpen}
            onSubmit={rentModal.onClose}
            onClose={rentModal.onClose}
            actionLabel="Submit"
    />
    )
}

export default RentModal;