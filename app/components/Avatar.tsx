"use client"

import Image from 'next/image'
import React, { FC } from 'react'

interface AvatarProps {
  src: string | null | undefined
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <div>
      <Image
      className="rounded-full h-auto w-auto"
      alt='Avatar'
      src={src ? src : "/images/avatar.jpg"}
      height="30"
      width="30"
      priority
      />
    </div>
  )
}

export default Avatar
