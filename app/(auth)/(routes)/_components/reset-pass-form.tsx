"use client"

import { useCustomToast } from "@/components/custom/custom-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import usePasswordReset from "./custom-hooks/passwordResetHook";
import { useSuccessToast } from "@/components/custom/success-toast";

interface ResetPasswrodProps {
    phoneNumber: string
}

const ResetPasswordForm = ({
    phoneNumber,
}: ResetPasswrodProps) => {

    const { push } = useRouter()


    // for toasts
    const customToast = useCustomToast()
    const successToast = useSuccessToast()

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [otp, setOtp] = useState<string>('')

    const handlePasswordReset = async (e: any) => {
        await usePasswordReset(password, confirmPassword, otp, phoneNumber, successToast, customToast, push, e)
    }

    return (
        <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
            <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-[#020817] shadown-md dark:shadow-[#024067] border-2 ">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Reset Your Password</h1>
                    </div>

                    <div className="mt-5">
                        <form>
                            <div className="grid gap-y-4">
                                <label className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">
                                    Password
                                </label>
                                <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="New Password" type="text" className="appearance-none block w-full px-3 py-2 border dark:bg-[#020817] rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                <label className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">
                                    Confirm Password
                                </label>
                                <input onChange={(e) => setPassword(e.target.value)} placeholder="Confirm Password" type="text" className="appearance-none block w-full px-3 py-2 border dark:bg-[#020817] rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                <label className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">
                                    Enter OTP
                                </label>
                                <input onChange={(e) => setOtp(e.target.value)} placeholder="6 Digits OTP here" type="number" className="appearance-none block w-full px-3 py-2 border dark:bg-[#020817] rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />

                                <span className="block w-full rounded-md shadow-sm">
                                    <Button onClick={(e) => handlePasswordReset(e)} className="w-full dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-[#0369A1] dark:hover:bg-[#00264D]">
                                        Confirm Reset Password
                                    </Button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default ResetPasswordForm;