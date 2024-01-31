"use client"

import { CustomToast } from "@/components/custom/custom-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordReset from "./custom-hooks/passwordResetHook";
import { SuccessToast } from "@/components/custom/success-toast";
import ResetPasswordOtpForm from "./resetPasswordOtpForm";

interface ResetPasswrodProps {
    phoneNumber: string
}

const ResetPasswordForm = ({
    phoneNumber,
}: ResetPasswrodProps) => {

    const { push } = useRouter()


    // for toasts
    const customToast = CustomToast()
    const successToast = SuccessToast()

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [toggle, setToggle] = useState<boolean>(false)

    const handlePasswordReset = async (e: any) => {
        e.preventDefault()
        await PasswordReset(password, phoneNumber, confirmPassword , successToast, customToast, push, e)
    }

    return (
       <div className="bg-black h-full w-full">
        {
        !toggle ?
            <ResetPasswordOtpForm phoneNumber={phoneNumber} setToggle={setToggle}/>
            :
            <main id="content" role="main" className="w-full bg-black  max-w-md mx-auto p-6">
                <div className="mt-7 bg-black  rounded-xl shadow-lg  shadown-md border-2 ">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold  text-white/80">Reset Your Password</h1>
                        </div>

                        <div className="mt-5">
                            <form>
                                <div className="grid gap-y-4">
                                    <label className="block text-sm font-medium leading-5  text-white/80">
                                        Password
                                    </label>
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="New Password" type="password" className="appearance-none block w-full px-3 py-2 border dark:bg-[#020817] rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    <label className="block text-sm font-medium leading-5 text-white/80">
                                        Confirm Password
                                    </label>
                                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Confirm Password" type="password" className="appearance-none block w-full px-3 py-2 border dark:bg-[#020817] rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    <span className="block w-full rounded-md shadow-sm">
                                        <Button onClick={(e) => handlePasswordReset(e)} className="w-full text-white/80 bg-blue-500 hover:bg-blue-600 dark:bg-[#0369A1] dark:hover:bg-[#00264D]">
                                            Confirm Reset Password
                                        </Button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
       }
       </div>
    );
}

export default ResetPasswordForm;