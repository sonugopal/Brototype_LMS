"use client";

import { Button } from "@/components/ui/button";
import { MouseEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormLogo } from "@/components/ui/logo";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./inputField.css";
import { verifyPhoneNumber } from "@/service/axios-services/dataFetching";
import toast from "react-hot-toast";
import { Transition } from "@headlessui/react";
type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

export const SingInForm = (props: Props) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const onSubmit = async () => {
    setDisableButton(true);
    await signIn("credentials", {
      phoneNumber: phoneNumber,
      password: password,
      redirect: true,
      callbackUrl: process.env.BASE_URL,
    });
    setDisableButton(false);
  };

  const checkPhoneNumber = async () => {
    if (phoneNumber) {
      try {
        setDisableButton(true);
        const userStatus = await verifyPhoneNumber(phoneNumber);
        if (userStatus.userExist) {
          setPhoneVerified(true);
          setDisableButton(false);
        } else {
          router.push(`/sign-up?phoneNumber=${phoneNumber}`);
        }
      } catch (error) {
        toast("Something went wrong. Please try again");
      }
    }
  };
  return (
    <>
      <div className="min-h-screen w-full max-w-screen  bg-black relative flex flex-col justify-center py-12 sm:px-6 px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-lg  rounded-lg  flex flex-col border-stone-800 border ">
          <div className="relative top-[-50px] h-full my-5 flex items-center justify-center w-full">
            <div className="absolute  justify-center flex items-center"></div>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md mt-3 z-50 pt-5">
            <div className="flex items-center justify-center w-full h-full">
              <FormLogo />
            </div>

            <div className="flex justify-center items-center">
              {!!props.error && (
                <p className="text-xs text-red-500">Invalid Credentials</p>
              )}
            </div>
          </div>
          <div className=" py-8 px-4 z-50 sm:rounded-lg sm:px-10 md:mx-1 sm:mx-10 mx-16">
            <form className="z-50">
              {!phoneVerified ? (
                <div className="mt-6">
                  <div className="mt-1 w-full flex rounded-md shadow-sm">
                    <PhoneInput
                      buttonStyle={{ background: "#000000", color: "#fff" }}
                      inputStyle={{ background: "#000000", color: "#fff" }}
                      inputClass="py-5 w-full px-3 border rounded-md ease-in-out sm:text-sm sm:leading-5 !border-stone-800 "
                      buttonClass="!border-stone-800 "
                      country={"in"}
                      value={phoneNumber}
                      onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                      onEnterKeyPress={checkPhoneNumber}
                    />
                  </div>
                  <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                      <Button
                        disabled={disableButton}
                        onClick={checkPhoneNumber}
                        className="w-full dark:text-white bg-zinc-900 hover:bg-zinc-800 !border-stone-800 "
                      >
                        Next
                      </Button>
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mt-6">
                    <div className="mt-1 rounded-md shadow-sm z-50">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        id="password"
                        name="password"
                        type="password"
                        onKeyDown={(e) => {
                          e.key == "Enter" ?? verifyPhoneNumber;
                        }}
                        className="appearance-none text-white block w-full px-3 py-2 border bg-black rounded-md placeholder-stone-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 border-stone-800"
                      />

                      <div className="flex items-center justify-end w-full text-xs my-2 ">
                        <Link href={"/forgot-pass"}>
                          <p className="cursor-pointer text-stone-400 hover:text-stone-200">
                            Forgot Password ?
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                      <Button
                        disabled={disableButton}
                        onClick={onSubmit}
                        className="w-full dark:text-white bg-zinc-900 hover:bg-zinc-800 !border-stone-800 "
                      >
                        Login
                      </Button>
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
