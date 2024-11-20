"use client";

import React, { FC } from 'react'
import { BiDollar } from 'react-icons/bi'
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}


const handleInputProps = (id:string) => {
  switch (id) {
    case "password":
      return { autoComplete: "current-password" };
    case "username":
      return { autoComplete: "username" };
    case "name":
      return { autoComplete: "name" };
    case "email":
      return { autoComplete: "email" };
    case "new-password":
      return { autoComplete: "new-password" };
    default:
      return {};
  }
};

const Input: FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        type={type}
        {...handleInputProps(id)}
        className={`
      peer
      w-full
      p-4
      pt-6
      font-light
      bg-white
      border-2
      rounded-md
      outline-none
      transition
      disabled:opacity-70
      disabled:cursor-not-allowed
      ${formatPrice ? 'pl-9' : "pl-4"}
      ${errors[id] ? 'border-tahiti-600' : "border-neutral-300"}
      ${errors[id] ? 'focus:border-tahiti-600' : "focus:border-black"}
      `}
      />
      <label
        className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-tahiti-600" : "text-zinc-400"}
      `}
      >{label}</label>
    </div>
  )
}

export default Input
