'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useTheme } from "next-themes";
import { useState } from "react";
import toast from "react-hot-toast";
import ResetPasswordForm from "./reset-pass-form";
import Link from "next/link";
import { useCustomToast } from "@/components/custom/custom-toast";
import { ForgotPassword, ValidatePhoneNumber } from "@/service/axios-services/dataFetching";


const ForgotPasswordForm = () => {

    const [mobile, setMobile] = useState<string>('')
    const [toggle, setToggle] = useState<boolean>(false)

    const customToast = useCustomToast()

    const mobileRegex = /^\+91\d{10}$/; // corrected here

    const handleSendMobile = async (e: any) => {
        try {
            e.preventDefault()
            let new_number = '+91' + mobile
            const verify = mobileRegex.test(new_number)
            console.log('reaching here!!')
            const request = await ValidatePhoneNumber(mobile)
            if (request.status == 200){
                if (verify) {
                    const request = await ForgotPassword(mobile)
                    if (request.status == 200) {
                        setToggle(true)
                    }
                } else {
                    customToast({ message: 'There is something wrong with your mobile number!!! Please check again' })
                }
            }else{
                customToast({ message: 'A user with this mobile number does not exist' })
            }
        } catch (error) {
            customToast({ message: 'There is no user with the given phone Number please check the number and try     again!!' })
        }
    }

    return (
        <>
            {
                !toggle ?
                    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
                        <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-[#020817] shadown-md dark:shadow-[#024067] border-2 ">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>

                                </div>

                                <div className="mt-5">
                                    <form>
                                        <div className="grid gap-y-4">
                                            <div>
                                                <label className="block text-sm font-bold ml-1 mb-2  dark:text-white">Mobile Number</label>
                                                <div className="my-3 flex rounded-md shadow-sm">

                                                    <span className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0  dark:bg-[#141e36]  bg-gray-50 dark:text-white  text-gray-500 sm:text-sm">
                                                        +91
                                                    </span>
                                                    <input maxLength={10} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Your Mobile Number" type="text" className="flex-1 border-2 focus:outline-none focus:border-blue-300 dark:bg-[#020817] form-input pl-3 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                                </div>
                                            </div>
                                            <span className="block w-full rounded-md shadow-sm">
                                                <Button onClick={(e) => handleSendMobile(e)} className="w-full dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-[#0369A1] dark:hover:bg-[#00264D]">
                                                    Reset Password
                                                </Button>
                                            </span>
                                            <span className="block w-full rounded-md shadow-sm">
                                                <Link href='sign-in'>
                                                    <Button className="w-full dark:text-white bg-green-500 hover:bg-green-600 dark:bg-gray-600 dark:hover:bg-gray-700">
                                                        Back To Login
                                                    </Button>
                                                </Link>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </main>
                    :
                    <ResetPasswordForm phoneNumber={mobile} />
            }
        </>
    );
}

export default ForgotPasswordForm;