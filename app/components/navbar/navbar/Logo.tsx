"use client"
import React from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'

const Logo = () => {
    const router = useRouter();

  return (
    <Image 
    alt="Logo"
    className='hidden md:block cursor-pointer'
    height="200"
    width="200"
    src="/images/WanderInn_logo_lg.png"
    />
  )
}

export default Logo
