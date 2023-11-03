"use client";

import React, { FC, useCallback, useEffect, useState } from 'react'

interface ModalProps{
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const Modal: FC<ModalProps> = ({ 
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel
 }) => {

    const [showModal, setShowModal] = useState<boolean|undefined>(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen])

    const handleOpen = useCallback(() => {

    }, []);

  return (
    <div>
      modal
    </div>
  )
}

export default Modal
