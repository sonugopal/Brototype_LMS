"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ResetPasswordForm from "./reset-pass-form";
import Link from "next/link";
import { CustomToast } from "@/components/custom/custom-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import SendToMobile from "./custom-hooks/forgot-pass-form/otpResetPassHook";
import PhoneInput from "react-phone-input-2";
import "./inputField.css"
import { FormLogo } from "@/components/ui/logo";
import Image from "next/image";


const ForgotPasswordForm = () => {

    const [mobile, setMobile] = useState<string>('')
    const [toggle, setToggle] = useState<boolean>(false)
    const[disableButton, setDisableButton] = useState<boolean>(false)

    const customToast = CustomToast()
    const successToast = SuccessToast()

    const handleSendToMobile = async (e: any) => {
        e.preventDefault()
        setDisableButton(true)
        SendToMobile(mobile, successToast, customToast, setToggle, setDisableButton)
    }

    return (
        <div className="h-full w-full bg-black">
            {
                !toggle ?
                    <main id="content" role="main" className="w-full h-full bg-black max-w-md mx-auto p-6">
                        <div className="mt-7 bg-black  rounded-xl shadow-lg  shadown-md ">
                            <div className="p-4 sm:p-7">
                                <div className="text-center z-50">
                                    <h1 className="z-50 text-2xl font-bold text-gray-800 ">Forgot password?</h1>
                                </div>

                                <div className="mt-5 z-50">
                                    <form>
                                        <div className="">
                                            <div className="relative h-full  md:top-[-80px] my-5 flex items-center justify-center w-full">
                                                <div className="absolute  justify-center flex items-center w-full">
                                                    <Image className="h-full md:w-full w-11/12" src="/Lamp1.svg" alt="Description of Image" width={0} height={0} />
                                                </div>
                                            </div>
                                            <div className="sm:mx-auto relative top-10 sm:top-0 sm:w-full sm:max-w-md mt-3 z-50 pt-5">
                                                <div className="flex items-center justify-center w-full h-full">
                                                    <FormLogo />
                                                </div>
                                            </div>
                                            <div className="top-10 relative mx-10 md:mx-5">
                                                <div className="mt-6 z-50">
                                                    <div className="mt-1 z-50 flex flex-col rounded-md shadow-sm">
                                                        <label htmlFor="username" className="z-50 mb-1 text-sm font-medium leading-5 text-white/80">Mobile Number</label>
                                                        <div style={{ boxShadow: '0 0 80px rgba(255, 255, 255, 0.5)' }}>
                                                            <PhoneInput
                                                                buttonStyle={{ background: '#000000', color: '#fff' }}
                                                                inputStyle={{ background: '#000000', color: '#fff' }}
                                                                inputClass="py-5 min-w-full w-full px-3 border rounded-md ease-in-out sm:text-sm sm:leading-5"
                                                                country={'in'}
                                                                value={mobile}
                                                                onChange={phoneNumber => setMobile(phoneNumber)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="z-50">
                                                    <span className="w-full flex flex-col my-3 rounded-md shadow-sm z-50">
                                                        <Button disabled={disableButton} onClick={(e) => handleSendToMobile(e)} className="w-full dark:text-white bg-[#55637B] hover:bg-[#5d6d88] dark:hover:bg-[#00264D]">
                                                            Reset Password
                                                        </Button>
                                                    </span>
                                                    <span className="w-full my-3 flex items-center justify-center rounded-md shadow-sm">
                                                        <Link href='sign-in'>
                                                            <h1 className="w-full text-xs text-white/80">
                                                                Back To Login
                                                            </h1>
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
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