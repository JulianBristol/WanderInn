"use client"
import React from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'

const Logo = () => {
    const router = useRouter();

  return (
    <Image 
    onClick={() => router.push("/")}
    alt="Logo"
    className='hidden md:block cursor-pointer'
    height="21"
    width="100"
    src="/images/WanderInn_lg.webp"
    />
  )
}

export default Logo
