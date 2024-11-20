"use client"

import React, { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react"
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import axios from 'axios';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
/* import { useRouter } from 'next/navigation'; */

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false)
/* 
    const router = useRouter(); */

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
            setIsLoading(true);

            axios.post('/api/register', data)
                .then(() => {
                    toast.success("Account created successfully!\nPlease login to your new account to continue")
                    registerModal.onClose()
                    loginModal.onOpen()
                })
                .catch((err) => {
            toast.error(`Something went wrong...\n${err.message}`)})
        .finally(() => {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Welcome to WanderInn!'
            subtitle='Create an account'
            center
            />
            <form>
                <Input 
                    id="email"
                    label="Email"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id="name"
                    label="Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input 
                    id="password"
                    label="Password"
                    type='password'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </form>
            {/* <div className='text-[0.825rem]'>
                We’ll call or text you to confirm your number. Standard message and data rates apply. {" "}
                <span
                className='font-semibold hover:cursor-pointer underline'
                onClick={() => router.push("/privacy")}
                >
                    Privacy Policy</span>
            </div> */}
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
            outline
            label={"Continue with Google"}
            icon={FcGoogle}
            onClick={() => signIn("google")}
            />
            <Button
            outline
            label={"Continue with Github"}
            icon={AiFillGithub}
            onClick={() => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                    className='text-neutral-800 cursor-pointer hover:underline'
                    onClick={() => {
                        registerModal.onClose()
                        loginModal.onOpen()
                    }}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    )
}

export default RegisterModal
