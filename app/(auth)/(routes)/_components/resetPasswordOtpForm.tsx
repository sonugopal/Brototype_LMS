import { CustomToast } from "@/components/custom/custom-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import Link from "next/link";
import { Otptimer } from "otp-timer-ts";
import { useRef, useState } from "react";
import OtpVerifyHook from "./custom-hooks/forgot-pass-form/otpVerifyHook";

const ResetPasswordOtpForm = ({phoneNumber, setToggle}: any) => {
    const inputRefs: { [key: number]: React.RefObject<HTMLInputElement> } = {};
    const [state, setState] = useState(Array(4).fill(''));

    const success = SuccessToast();
    const failed = CustomToast();

    // for otp verification and resending
    const handleSubmit = async () => {
        await OtpVerifyHook(state, phoneNumber, success, failed, setToggle)
    }

    const handleChange = (e: any, i: any) => {
        const value = e.target.value;
        setState(prevState => {
            const newState = [...prevState];
            newState[i] = value;
            return newState;
        });

        if (value && i < 5 && inputRefs[i + 1] && inputRefs[i + 1].current) {
            inputRefs[i + 1].current!.focus(); // Focus on the next field after entering a value
        }
    };


    return (
        <div className="relative flex  flex-col justify-center overflow-hidden bg-[#F9FAFB] dark:bg-[#020817]  py-28 px-24">
            <div className="relative bg-white dark:bg-[#020817] dark:border-2 dark:shadow-[#0369A1] dark:border-[#0369A1] px-6 pt-10 pb-9 border-1 shadow-md mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Mobile Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your Mobile please check</p>
                        </div>
                    </div>

                    <div>
                        <form>
                            <div className="flex flex-col space-y-16 ">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    {state.map((s, i) => (
                                        <div key={i} className="w-16 h-16 mx-2">
                                            <input
                                                ref={inputRefs[i]}
                                                maxLength={1}
                                                value={s}
                                                onChange={(e) => handleChange(e, i)}
                                                className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white dark:bg-[#020817]  focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                type="text"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button onClick={handleSubmit} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn&apos;t recieve code?</p><Otptimer text="" onResend={handleSubmit} seconds={60} />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Link href={`sign-in`}>
                                            <p className="text-red-400 hover:text-red-600 text-sm">Cancel</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
)}
 
export default ResetPasswordOtpForm;