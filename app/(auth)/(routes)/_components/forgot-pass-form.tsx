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
import { FormLogo } from "@/components/ui/logo";
import Image from "next/image";


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
        <div className="h-full w-full bg-black">
            {
                !toggle ?
                    <main id="content" role="main" className="w-full h-full bg-black max-w-md mx-auto p-6">
                        <div className="mt-7 bg-black  rounded-xl shadow-lg  shadown-md ">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800 ">Forgot password?</h1>

                                </div>

                                <div className="mt-5 z-50">
                                    <form>
                                        <div className="grid gap-y-4">
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
                                            <div className="mt-8">
                                                <label className="block text-sm font-bold ml-1 mb-2 ">Mobile Number</label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <PhoneInput
                                                         buttonStyle={{ background: '#000000', color: '#fff' }}
                                                         inputStyle={{ background: '#000000', color: '#fff' }}
                                                         inputClass="py-5 min-w-full w-full px-3 border rounded-md ease-in-out sm:text-sm sm:leading-5"
                                                         country={'in'}
                                                         value={mobile}
                                                        onChange={mobile => setMobile(mobile)}
                                                    />
                                                </div>
                                            </div>
                                            <span className="block w-full rounded-md shadow-sm z-50">
                                                <Button onClick={(e) => handleSendToMobile(e)} className="w-full dark:text-white bg-[#55637B] hover:bg-[#5d6d88] dark:hover:bg-[#00264D]">
                                                    Reset Password
                                                </Button>
                                            </span>
                                            <span className="w-full flex items-center justify-center rounded-md shadow-sm">
                                                <Link href='sign-in'>
                                                    <h1 className="w-full text-xs text-white/80">
                                                        Back To Login
                                                    </h1>
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
        </div>
    );
}

export default ForgotPasswordForm;