"use client";

import { Button } from "@/components/ui/button";
import { MouseEvent, useEffect, useState } from "react";
import { OtpForm } from "./otp-form";
import Link from "next/link";
import { CustomToast } from "@/components/custom/custom-toast";
import { FormLogo } from "@/components/ui/logo";
import SendOtp from "./custom-hooks/sign-up-form/sendOtpHook";
import verifyAdmin from "./custom-hooks/sign-up-form/verifyAdmin";
import verifyBDEUser from "./custom-hooks/sign-up-form/verifyBDEUser";
import { SuccessToast } from "@/components/custom/success-toast";
import PhoneInput from "react-phone-input-2";
import "./inputField.css";
import Image from "next/image";
import { DropDown } from "./dropDown";
import { Divide } from "lucide-react";
import { useSearchParams } from "next/navigation";
// type Props = {
//   phoneNumber?: string;
// };

export const SingUpForm = (props: any) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [qualification, setQualification] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const toast = CustomToast();
  const successToast = SuccessToast();

  const [toggle, setToggle] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAddedUser, setIsAddedUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const phone = searchParams.get("phoneNumber");
    if (phone) {
      verifyAdmin(phone, toast, (result: any) => {
        setPhoneNumber(phone);
        if (result) {
          setFirstName(result.firstName);
          setLastName(result.lastName);
          setIsAdmin(true);
          setIsAddedUser(true);
          console.log("Is BDE");
        } else {
          verifyBDEUser(phone, toast, (result: any) => {
            if (result) {
              setFirstName(result.firstName);
              setLastName(result.lastName);
              setIsAddedUser(true);
            }
          });
        }
      });
    }
  }, []);

  const handleSendOTP = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    await setDisableButton(true);
    try {
      setLoading(true);
      await SendOtp(
        firstName,
        lastName,
        phoneNumber,
        email,
        qualification,
        password,
        confirmPassword,
        successToast,
        toast,
        toggle,
        setToggle,
        setLoading,
        setDisableButton
      );
    } catch (error) {
      setLoading(false);
      setDisableButton(false);
      console.log("Error:", error);
    }
  };

  return (
    <>
      {toggle ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <OtpForm
            phoneNumber={phoneNumber}
            firstName={firstName}
            email={email}
            qualification={qualification}
            lastName={lastName}
            password={password}
            role={isAdmin ? 2 : 0}
          />
        </div>
      ) : (
        <div className="min-h-screen w-[100vw] max-w-screen items-center  bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-lg ">
            <div className="bg-black py-8 shadow sm:rounded-lg sm:px-10">
              <div className="relative top-[-80px] h-full w-full my-5 flex items-center justify-center">
                <div className="absolute  justify-center flex items-center"></div>
              </div>
              <div className="sm:mx-auto sm:w-full z-50 sm:max-w-md pt-3">
                <div className="flex z-50 items-center justify-center w-full h-full">
                  <FormLogo />
                </div>
              </div>
              <form
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const form = (e.target as HTMLInputElement).form;
                    if (form) {
                      const index = Array.prototype.indexOf.call(
                        form,
                        e.target
                      );
                      if (form.elements[index + 1]) {
                        (form.elements[index + 1] as HTMLInputElement).focus();
                      }
                    }
                  }
                }}
                className="z-50 mt-5 md:mx-8 mx-14"
                method="POST"
                action="#"
              >
                <div className="z-50 flex items-center justify-center w-full gap-x-3">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isAddedUser}
                      placeholder="John"
                      type="text"
                      value={firstName}
                      className="appearance-none focus:border-blue-300 text-white block w-full px-3 py-2 border bg-black  rounded-md  focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5 border-stone-800"
                    />
                    <div className="hidden absolute inset-y-0 right-0 pr-3  items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        id="last-name"
                        name="last-name"
                        placeholder="Doe"
                        type="text"
                        disabled={isAddedUser}
                        className="appearance-none bg-black text-white focus:border-blue-300 block w-full px-3 py-2 border  rounded-md  focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5 border-stone-800"
                      />
                      <div className="hidden absolute inset-y-0 right-0 pr-3  items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-5">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                      type="email"
                      className="appearance-none bg-black text-white focus:border-blue-300 block w-full px-3 py-2 border  rounded-md  focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5 !border-stone-800"
                    />
                    <div className="hidden absolute inset-y-0 right-0 pr-3  items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="z-50">
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <DropDown setQualification={setQualification} />
                  </div>
                </div>

                <div className="mt-6 z-50">
                  <div className="mt-1 flex flex-col rounded-md shadow-sm">
                    <PhoneInput
                      buttonStyle={{ background: "#000000", color: "#fff" }}
                      inputStyle={{ background: "#000000", color: "#fff" }}
                      inputClass="py-5 min-w-full w-full px-3 border rounded-md ease-in-out sm:text-sm sm:leading-5 !border-stone-800 "
                      buttonClass="!border-stone-800 "
                      country={"in"}
                      value={phoneNumber}
                      onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-6 z-50">
                  <div className="mt-1 flex flex-col rounded-md shadow-sm ">
                    <input
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      className="appearance-non z-50 block w-full px-3 py-2 border bg-black text-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 !border-stone-800"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      placeholder="confirm password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      className="appearance-non block bg-black text-white w-full px-3 py-2 border  rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 !border-stone-800"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <Button
                      disabled={disableButton}
                      onClick={handleSendOTP}
                      className="w-full text-white/80 bg-zinc-900 hover:bg-zinc-800 !border-stone-800"
                    >
                      {loading ? "Please wait" : "Send OTP"}
                    </Button>
                  </span>
                  <span className="block text-xs text-white/80 w-full text-center rounded-md shadow-sm mt-2">
                    <Link href={`sign-in`}>Already have an account? Login</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

{
  /* <PhoneInput
                        buttonStyle={{ background: "#000000", color: "#fff" }}
                        inputStyle={{ background: "#000000", color: "#fff" }}
                        inputClass="py-5 min-w-full w-full px-3 border rounded-md ease-in-out sm:text-sm sm:leading-5"
                        country={"in"}
                        value={phoneNumber}
                        onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                      />
                      <Button
                        onClick={verifyMobile}
                        className="w-4/12  bg-[#55637B] hover:bg-[#5a6a85] text-white/80 "
                      ></Button> */
}
