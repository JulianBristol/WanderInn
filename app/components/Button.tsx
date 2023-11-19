"use client"

import { FC } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return (
        <button
        className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        select-none
        ${outline ? "bg-white active:bg-slate-300 hover:bg-slate-200" : "bg-tahiti-600 active:bg-tahiti-900"}
        ${outline ? "border-black" : "border-tahiti-600 active:border-tahiti-900"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
        `}
        disabled={disabled}
        onClick={onClick}
        >
            {Icon && (
                <Icon
                size={24}
                className="absolute left-4 top-3" />
            )}
            {label}
        </button>
    )
}

export default Button;