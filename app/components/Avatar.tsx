"use client"

import Image from 'next/image'
import React from 'react'

const Avatar = () => {
  return (
    <div>
      <Image
      className="rounded-full"
      alt='Avatar'
      src="/images/avatar.jpg"
      height="30"
      width="30"
      />
    </div>
  )
}

export default Avatar
