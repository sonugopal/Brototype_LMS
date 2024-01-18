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

export const SingUpForm = () => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const toast = CustomToast()
    const successToast = SuccessToast()

    const [toggle, setToggle] = useState(false)

    const handleSendOTP = async (e: any) => {
        e.preventDefault()
        await SendOtp(firstName, lastName, phoneNumber, password, confirmPassword, successToast, toast, toggle, setToggle)
    }

    return (
        <>
            <div className="min-h-screen w-[100vw] max-w-screen  bg-gray-50 dark:bg-[#020817] flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md dark:shadow-md  rounded-lg dark:border-2 dark:shadow-[#0369A1] dark:border-[#0369A1] ">
                    <div className="bg-white dark:bg-[#020817] py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md pt-3">
                        <div className="flex items-center justify-center h-full w-full mb-5">
                            <FormLogo/>
                        </div>
                    </div>
                        <form method="POST" action="#">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700 dark:text-white">First Name</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input onChange={(e) => setFirstName(e.target.value)} placeholder="John Doe" type="text" className="appearance-none focus:border-blue-300 block w-full px-3 py-2 border  rounded-md  focus:outline-none focus:shadow-outline-blue  dark:bg-[#020817] transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
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
                                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">Last Name</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input onChange={(e) => setLastName(e.target.value)} id="last-name" name="last-name" placeholder="John Doe" type="text" className="appearance-none focus:border-blue-300 block w-full px-3 py-2 border  rounded-md  focus:outline-none focus:shadow-outline-blue  dark:bg-[#020817] transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
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
                                <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">Mobile Number</label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <PhoneInput
                                    inputClass="min-w-[367px] py-5 dark:bg-[#020817] w-full px-3 border  rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    country={'in'}
                                    value={phoneNumber}
                                    onChange={phoneNumber => setPhoneNumber(phoneNumber)}
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className="appearance-none dark:bg-[#020817] block w-full px-3 py-2 border  rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">
                                    Confirm Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} id="password_confirmation" name="password_confirmation" type="password" className="appearance-none dark:bg-[#020817] block w-full px-3 py-2 border  rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <Button onClick={handleSendOTP} className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-[#0369A1] dark:hover:bg-[#00264D] dark:text-white">
                                        Send Otp
                                    </Button>
                                </span>
                                <span className="block w-full rounded-md shadow-sm mt-2">
                                    <Link href={`sign-in`}>
                                        <Button className="w-full dark:text-white bg-green-500 hover:bg-green-600 dark:dark:bg-gray-600 dark:hover:bg-slate-700">
                                            Already have an account? Login
                                        </Button>
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