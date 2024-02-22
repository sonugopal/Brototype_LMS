"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, MouseEvent, useState } from "react";
import ResetPasswordForm from "./reset-pass-form";
import Link from "next/link";
import { CustomToast } from "@/components/custom/custom-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import SendToMobile from "./custom-hooks/forgot-pass-form/otpResetPassHook";
import PhoneInput from "react-phone-input-2";
import "./inputField.css";
import { FormLogo } from "@/components/ui/logo";
import Image from "next/image";

const ForgotPasswordForm = () => {
  const [mobile, setMobile] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const customToast = CustomToast();
  const successToast = SuccessToast();

  const handleSendToMobile = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setDisableButton(true);
    SendToMobile(
      mobile,
      successToast,
      customToast,
      setToggle,
      setDisableButton
    );
  };

  return (
    <div className="h-full w-full bg-black">
      {!toggle ? (
        <main
          id="content"
          role="main"
          className="w-full h-full bg-black max-w-md mx-auto p-6"
        >
          <div className="mt-7 bg-black  rounded-xl shadow-lg  shadown-md ">
            <div className="p-4 sm:p-7">
              <div className="mt-5 z-50">
                <form>
                  <div className="">
                    <div className="relative h-full  md:top-[-80px] my-5 flex items-center justify-center w-full">
                      <div className="absolute  justify-center flex items-center w-full"></div>
                    </div>
                    <div className="sm:mx-auto relative top-10 sm:top-0 sm:w-full sm:max-w-md mt-3 z-50 pt-5">
                      <div className="flex items-center justify-center w-full h-full">
                        <FormLogo />
                      </div>
                    </div>
                    <div className="top-10 relative mx-10 md:mx-5">
                      <div className="mt-6 z-50">
                        <div className="mt-1 z-50 flex flex-col rounded-md shadow-sm">
                          <div>
                            <PhoneInput
                              inputClass="py-5 min-w-full w-full px-3 border rounded-md ease-in-out sm:text-sm sm:leading-5 !border-stone-800 !bg-black"
                              buttonClass="!border-stone-800 !bg-black"
                              country={"in"}
                              value={mobile}
                              onChange={(phoneNumber) => setMobile(phoneNumber)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="z-50">
                        <span className="w-full flex flex-col my-3 rounded-md shadow-sm z-50">
                          <Button
                            disabled={disableButton}
                            onClick={(e) => handleSendToMobile(e)}
                            className="w-full dark:text-white bg-zinc-900 hover:bg-zinc-800 !border-stone-800 "
                          >
                            Reset Password
                          </Button>
                        </span>
                        <span className="w-full my-3 flex items-center justify-left rounded-md shadow-sm">
                          <Link href="sign-in">
                            <h1 className="w-full text-xs text-white/80 justify-start">
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
      ) : (
        <ResetPasswordForm phoneNumber={mobile} />
      )}
    </div>
  );
};

export default ForgotPasswordForm;
