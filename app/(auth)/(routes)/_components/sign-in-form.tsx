"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormLogo } from "@/components/ui/logo";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import "./inputField.css"


type Props = {
    className?: string
    callbackUrl?: string
    error?: string
}

export const SingInForm = (props: Props) => {

    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSubmit = async (e: any) => {
        e.preventDefault()
        await signIn('credentials', {
            phoneNumber: phoneNumber,
            password: password,
            redirect: true,
            callbackUrl: process.env.BASE_URL
        })
    }

    return (
        <>
            <div className="min-h-screen w-[100vw] max-w-screen  bg-black relative left-5 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-lg  rounded-lg  flex flex-col">
                    <div className="relative h-full top-10 my-5 flex items-center justify-center w-full">
                        <div className="absolute min-w-[500px]">
                            <Image src="/Lamp1.svg" alt="Description of Image" width={500} height={120} />
                        </div>
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-md mt-3 z-50 pt-5">
                        <div className="flex items-center justify-center w-full h-full">
                            <FormLogo />
                        </div>
                        <div className="flex justify-center items-center">
                            {!!props.error && <p className="text-xs text-red-500">Invalid Credentials</p>}
                        </div>
                    </div>
                    <div className=" py-8 px-4 z-50 sm:rounded-lg sm:px-10 md:mx-1 mx-10">
                        <form className="z-50" onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                const form = (e.target as HTMLInputElement).form;
                                if (form) {
                                    const index = Array.prototype.indexOf.call(form, e.target);
                                    if (form.elements[index + 1]) {
                                        (form.elements[index + 1] as HTMLInputElement).focus();
                                    }
                                }
                            }
                        }}>
                            <div className="mt-6">
                                <label htmlFor="mobile number" className="block text-xs font-medium leading-5 text-white/80">Mobile Number</label>
                                <div style={{ boxShadow: '0 0 80px rgba(255, 255, 255, 0.5)' }} className="mt-1 w-full flex rounded-md shadow-sm">
                                    <PhoneInput
                                        buttonStyle={{ background: '#000000', color: '#fff' }}
                                        inputStyle={{ background: '#000000', color: '#fff' }}
                                        inputClass="py-5 w-full px-3 border rounded-md ease-in-out sm:text-sm sm:leading-5"
                                        country={'in'}
                                        value={phoneNumber}
                                        onChange={phoneNumber => setPhoneNumber(phoneNumber)}
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password" className="block text-xs font-medium  leading-5 text-white">
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm z-50">
                                    <input style={{ boxShadow: '0 0 80px rgba(255, 255, 255, 0.5)' }} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="password" name="password" type="password" className="appearance-none text-white block w-full px-3 py-2 border bg-black rounded-md placeholder-white focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    <div className="flex items-center justify-end w-full text-xs my-2 ">
                                        <Link href={'/forgot-pass'}>
                                            <p className="hover:text-white/80 text-white cursor-pointer">
                                                Forgot Password ?
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <Button onClick={onSubmit} className="w-full dark:text-white bg-gray-500 hover:bg-gray-600 ">
                                        Login
                                    </Button>
                                </span>
                                <span className="flex justify-center items-center w-full rounded-md shadow-sm my-3">
                                    <Link href='sign-up'>
                                        <h1 className="w-full text-white text-sm hover:text-white/80">
                                            Register Now
                                        </h1>
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}