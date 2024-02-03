"use client"

import { CustomToast } from "@/components/custom/custom-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordReset from "./custom-hooks/passwordResetHook";
import { SuccessToast } from "@/components/custom/success-toast";
import ResetPasswordOtpForm from "./resetPasswordOtpForm";
import Image from "next/image";
import { FormLogo } from "@/components/ui/logo";
import Link from "next/link";

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
        await PasswordReset(password, phoneNumber, confirmPassword, successToast, customToast, push, e)
    }

    return (
        <div className="bg-black h-full w-full">
            {
                !toggle ?
                    <ResetPasswordOtpForm phoneNumber={phoneNumber} setToggle={setToggle} />
                    :
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-lg  rounded-lg  flex flex-col">
                        <div className="relative h-full top-40 my-5 flex items-center justify-center w-full">
                            <div className="absolute min-w-[550px]">
                                <Image src="/Lamp1.svg" alt="Description of Image" width={550} height={120} />
                            </div>
                        </div>
                        <div className="sm:mx-auto  relative top-10 sm:w-full sm:max-w-md mt-3 z-50 pt-5">
                            <div className="flex items-center justify-center w-full h-full">
                                <FormLogo />
                            </div>
                        </div>
                        <div className="mt-7 relative top-10 md:mx-10 mx-14 rounded-xl shadow-lg  shadown-md  ">
                            <div className="p-4 sm:p-7">
                                <form>
                                    <div className="grid gap-y-2">
                                        <div className="z-50">
                                            <label className="z-50 text-sm mb-1 font-medium leading-5  text-white/80">
                                                Password
                                            </label>
                                            <div style={{ boxShadow: '0 0 80px rgba(255, 255, 255, 0.5)' }}>
                                                <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="New Password" type="password" className="appearance-none text-white block w-full px-3 py-2 border bg-black rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                            </div>
                                        </div>
                                        <div className="my-2 z-50">
                                            <label className="z-50 text-sm mb-1 font-medium leading-5 text-white/80">
                                                Confirm Password
                                            </label>
                                            <div style={{ boxShadow: '0 0 80px rgba(255, 255, 255, 0.5)' }}>
                                                <input onChange={(e) => setPassword(e.target.value)} placeholder="Confirm Password" type="password" className="appearance-none text-white block w-full px-3 py-2 mb-1 border bg-black rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                            </div>
                                            <span className="block w-full rounded-md mt-5 shadow-sm">
                                                <Button onClick={(e) => handlePasswordReset(e)} className="w-full text-white/80 bg-[#42526C] hover:bg-[#42526C]/80">
                                                    Confirm Reset Password
                                                </Button>
                                            </span>
                                            <div className="flex items-center justify-center mt-5">
                                                <Link href={`sign-in`}>
                                                    <button className="text-white h-[30px]  flex items-center justify-center hover:bg-[#55637B]/20 bg-[#55637B]/40 min-w-[120px] text-center rounded-md text-sm">
                                                        <div className="flex items-center justify-center w-full h-full">
                                                            <p>Back To Home</p>
                                                        </div>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default ResetPasswordForm;