"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OtpForm } from "./otp-form";
import Link from "next/link";
import { CustomToast } from "@/components/custom/custom-toast";
import { FormLogo } from "@/components/ui/logo";
import SendOtp from "./custom-hooks/sign-up-form/sendOtpHook";
import { SuccessToast } from "@/components/custom/success-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from "next/image";

export const SingUpForm = () => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const toast = CustomToast()
    const successToast = SuccessToast()

    const [toggle, setToggle] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSendOTP = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            await SendOtp(firstName, lastName, phoneNumber, password, confirmPassword, successToast, toast, toggle, setToggle, setLoading)
        } catch (error) {
            console.log("Error:", error)
        }
    }

    return (
        <>
            <div className="min-h-screen w-[100vw] max-w-screen  bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-lg ">
                    <div className="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="relative h-full my-5 flex items-center justify-center w-full">
                            <div className="absolute ">
                                <Image className="w-full h-full" src="/Lamp7.svg" alt="Description of Image" width={600} height={200} />
                            </div>
                        </div>
                        <div className="sm:mx-auto sm:w-full z-50 sm:max-w-md pt-3">
                            <div className="flex z-50 items-center justify-center w-full h-full">
                                <FormLogo />
                            </div>
                        </div>
                        <form className="z-50" method="POST" action="#">
                            <div className="z-50">
                                <label htmlFor="email" className="block text-sm font-medium leading-5  text-white/80">First Name</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input onChange={(e) => setFirstName(e.target.value)} placeholder="John" type="text" className="appearance-none focus:border-blue-300 text-white block w-full px-3 py-2 border bg-black  rounded-md  focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    <div className="hidden absolute inset-y-0 right-0 pr-3  items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="my-5">
                                <label htmlFor="email" className="block text-sm font-medium leading-5 text-white/80">Last Name</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input onChange={(e) => setLastName(e.target.value)} id="last-name" name="last-name" placeholder="Doe" type="text" className="appearance-none bg-black text-white focus:border-blue-300 block w-full px-3 py-2 border  rounded-md  focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    <div className="hidden absolute inset-y-0 right-0 pr-3  items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="username" className="block text-sm font-medium leading-5 text-white/80">Mobile Number</label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <PhoneInput
                                        buttonStyle={{ background: '#000000', color: '#fff' }}
                                        inputStyle={{ background: '#000000', color: '#fff' }}
                                        inputClass="py-5 min-w-full w-full px-3 border rounded-md ease-in-out sm:text-sm sm:leading-5"
                                        country={'in'}
                                        value={phoneNumber}
                                        onChange={phoneNumber => setPhoneNumber(phoneNumber)}
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-white/80">
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className="appearance-non block w-full px-3 py-2 border bg-black text-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-white/80">
                                    Confirm Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} id="password_confirmation" name="password_confirmation" type="password" className="appearance-non block bg-black text-white w-full px-3 py-2 border  rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <Button onClick={handleSendOTP} className="w-full bg-[#55637B] hover:bg-[#5a6a85] text-white/80">
                                        {loading ? 'Please wait' : 'Send OTP'}
                                    </Button>
                                </span>
                                <span className="block text-xs text-white/80 w-full text-center rounded-md shadow-sm mt-2">
                                    <Link href={`sign-in`}>
                                        Already have an account? Login
                                    </Link>
                                </span>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
            {
                toggle &&
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <OtpForm phoneNumber={phoneNumber} firstName={firstName} lastName={lastName} password={password} role={0} />
                </div>
            }
        </>
    )
}