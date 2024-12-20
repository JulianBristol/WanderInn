"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
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
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div onClick={handleClose}
                className="
                justify-center
      items-center
      flex
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
      z-50
      bg-neutral-800/70
      outline-none
      focus:outline-none
    "
            >
                <div
                    className="
      relative
      w-full
      md:w-4/6
      lg:w-3/6
      xl:w-2/5
      my-6
      mx-auto
      h-full
      lg:h-auto
      md:h-auto
      "
                >
                    {/* Content */}
                    <div
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from bubbling to the parent
                      }}
                        className={`
        translate
        duration-300
        h-full
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}
        `}
                    >
                        <div
                            className="
          translate
          h-full
          lg:h-auto
          md:h-auto
          border-0
          rounded-lg
          shadow-lg
          relative
          flex
          flex-col
          w-full
          bg-white
          outline-none
          focus:outline-none
          "
                        >
                            {/* Header */}
                            <div
                                className="
            flex
            items-center
            p-6
            rounded-t
            justify-center
            relative
            border-b-[1px]
            "
                            >
                                <div className="text-lg font-semibold">{title}</div>
                                <button
                                    className="
              hover:opacity-70
              p-1
              border-0
              absolute
              right-9
              transition
              "
                                    onClick={handleClose}
                                >
                                    <IoMdClose size={18} />
                                </button>
                            </div>
                            {/* Body */}
                            <div className="relative p-6 flex-auto">{body}</div>
                            {/* footer */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
