"use client";

import React, { FC, useCallback } from "react";
import { CldUploadWidget }from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any
}

interface CloudinaryUploadProps {
    onChange: (value: string ) => void;
    value: string;
}

const CloudinaryUpload: FC<CloudinaryUploadProps> = ({ onChange, value }) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="crjwvvap"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div 
                        onClick={() => open?.()}
                        className="
                            relative
                            cursor-pointer
                            hover:opacity-70
                            transition
                            border-dashed
                            border-2
                            p-20
                            border-neutral-300
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-4
                            text-neutral-600
                        "
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={value}
                                    alt="user uploaded image"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: "cover"}}
                                />
                            </div>
                        )}
                    </div>
                )
            }}   
        </CldUploadWidget>
    )
}

export default CloudinaryUpload;