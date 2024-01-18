"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ResetPasswordForm from "./reset-pass-form";
import Link from "next/link";
import { CustomToast } from "@/components/custom/custom-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import SendToMobile from "./custom-hooks/forgot-pass-form/otpResetPassHook";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';


const ForgotPasswordForm = () => {

    const [mobile, setMobile] = useState<string>('')
    const [toggle, setToggle] = useState<boolean>(false)

    const customToast = CustomToast()
    const successToast = SuccessToast()

    const handleSendToMobile = async (e: any) => {
        e.preventDefault()
        await SendToMobile(mobile, successToast, customToast, setToggle)
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
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                <PhoneInput
                                                inputClass="min-w-full py-5 dark:bg-[#020817] w-full px-3 border  rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                country={'in'}
                                                value={mobile}
                                                onChange={mobile => setMobile(mobile)}
                                                />
                                            </div>
                                            </div>
                                            <span className="block w-full rounded-md shadow-sm">
                                                <Button onClick={(e) => handleSendToMobile(e)} className="w-full dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-[#0369A1] dark:hover:bg-[#00264D]">
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