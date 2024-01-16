"use client"

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


type Props = {
    className?: string
    callbackUrl?: string
    error?: string
}


export const SingInForm = (props: Props) => {

    const router = useRouter()

    const phoneNumber = useRef('')
    const password = useRef('')

    const onSubmit = async (e: any) => {
        e.preventDefault()
        await signIn('credentials', {
            phoneNumber: phoneNumber.current,
            password: password.current,
            redirect: true,
            callbackUrl: props.callbackUrl ?? 'http://localhost:3000/'
        })
    }

    return (
        <>
            <div className="min-h-screen w-[100vw] max-w-screen  bg-gray-50 dark:bg-[#020817] flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-lg dark:shadow-md dark:border-2 dark:border-[#0369A1] dark:shadow-[#0369A1]  rounded-lg  flex flex-col">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md mt-3 pt-5">

                        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />


                        <h2 className="mt-6 text-center text-2xl leading-9 font-extrabold text-gray-900 dark:text-white">
                            Welcome, We've missed you
                        </h2>
                        <div className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                            <p
                                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                There is a lot of catching up to do...
                            </p>
                        </div>
                        <div className="flex justify-center items-center">
                            {!!props.error && <p className="text-xs text-red-500">Invalid Credentials</p>}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#020817] py-8 px-4  sm:rounded-lg sm:px-10">
                        <form  >


                            <div className="mt-6">
                                <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">Mobile Number</label>
                                <div className="mt-1 flex rounded-md shadow-sm">

                                    <span className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0  dark:bg-[#141e36]  bg-gray-50 dark:text-white  text-gray-500 sm:text-sm">
                                        +91
                                    </span>
                                    <input maxLength={10} onChange={(e) => (phoneNumber.current = e.target.value)} placeholder="Enter Your Mobile Number" type="text" className="flex-1 border-2 focus:outline-none focus:border-blue-300 dark:bg-[#020817] form-input pl-3 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700 dark:text-white">
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input onChange={(e) => (password.current = e.target.value)} placeholder="*******" id="password" name="password" type="password" className="appearance-none block w-full px-3 py-2 border dark:bg-[#020817] rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    <div className="flex items-center justify-end w-full text-xs my-2 ">
                                        <Link href={'/forgot-pass'}>
                                            <p className="hover:text-[#2b4467] text-[#3B82F6] cursor-pointer">
                                                Forgot Password ?
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>



                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <Button onClick={onSubmit} className="w-full dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-[#0369A1] dark:hover:bg-[#00264D]">
                                        Login
                                    </Button>
                                </span>
                                <span className="block w-full rounded-md shadow-sm my-3">
                                    <Link href='sign-up'>
                                        <Button className="w-full dark:text-white bg-green-500 hover:bg-green-600 dark:bg-gray-600 dark:hover:bg-gray-700">
                                            Register
                                        </Button>
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