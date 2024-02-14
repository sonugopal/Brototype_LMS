import { CustomToast } from "@/components/custom/custom-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import Link from "next/link";
import { Otptimer } from "otp-timer-ts";
import { useState } from "react";
import OtpVerifyHook from "./custom-hooks/forgot-pass-form/otpVerifyHook";
import { FormLogo } from "@/components/ui/logo";
import Image from "next/image";

const ResetPasswordOtpForm = ({ phoneNumber, setToggle }: any) => {
  const inputRefs: { [key: number]: React.RefObject<HTMLInputElement> } = {};
  const [state, setState] = useState(Array(4).fill(""));
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const success = SuccessToast();
  const failed = CustomToast();

  // for otp verification and resending
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisableButton(true);
    OtpVerifyHook(
      state,
      phoneNumber,
      success,
      failed,
      setToggle,
      setDisableButton
    );
  };
  const handleReset = async () => {
    OtpVerifyHook(
      state,
      phoneNumber,
      success,
      failed,
      setToggle,
      setDisableButton
    );
  };

  const handleChange = (e: any, i: any) => {
    const value = e.target.value;

    setState((prevState) => {
      const newState = [...prevState];
      newState[i] = value;
      return newState;
    });

    if (value && i < 5 && inputRefs[i + 1] && inputRefs[i + 1].current) {
      inputRefs[i + 1].current!.focus(); // Focus on the next field after entering a value
    }

    if (!value && i > 0 && inputRefs[i - 1] && inputRefs[i - 1].current) {
      inputRefs[i - 1].current!.focus(); // Focus on the previous field when deleting
    }
  };

  const handleKeyDown = (e: any, i: any) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      i > 0 &&
      inputRefs[i - 1] &&
      inputRefs[i - 1].current
    ) {
      if (state[i]) {
        setState((prevState) => {
          const newState = [...prevState];
          newState[i] = "";
          return newState;
        });
      } else {
        setState((prevState) => {
          const newState = [...prevState];
          newState[i - 1] = "";
          return newState;
        });
        inputRefs[i - 1].current!.focus();
      }
    }
  };

  return (
    <div className="relative flex  flex-col justify-center overflow-hidden bg-black py-28 px-24">
      <div className="relative bg-black  dark:border-2 px-6 pt-10 pb-9 border-1 shadow-md mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="relative h-full top-[-100px] sm:top-[-100px] my-5 flex items-center justify-center w-full">
            <div className="absolute min-w-[500px] min-h-[320px]">
              <Image
                src="/Lamp1.svg"
                alt="Description of Image"
                width={500}
                height={120}
              />
            </div>
          </div>
          <div className="sm:mx-auto relative top-[-70px] sm:w-full sm:max-w-md  z-50 ">
            <div className="flex items-center justify-center w-full h-full">
              <FormLogo />
            </div>
          </div>

          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const form = (e.target as HTMLInputElement).form;
                if (form) {
                  const index = Array.prototype.indexOf.call(form, e.target);
                  if (form.elements[index + 1]) {
                    (form.elements[index + 1] as HTMLInputElement).focus();
                  }
                }
              }
            }}
          >
            <div className="flex flex-col relative top-[-110px] space-y-8 ">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {state.map((s, i) => (
                  <div key={i} className="w-14 h-14 mx-2">
                    <input
                      ref={(ref) => (inputRefs[i] = { current: ref })} // Assign the ref to the corresponding property in the object
                      maxLength={1}
                      value={s}
                      onChange={(e) => handleChange(e, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-black text-white focus:ring-1 ring-blue-700"
                      style={{ boxShadow: "0 0 80px rgba(255, 255, 255, 0.5)" }}
                      type="text"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-5">
                <div className="flex items-center justify-center h-full w-full">
                  <button
                    disabled={disableButton}
                    onClick={(e) => handleSubmit(e)}
                    className="flex flex-row w-[300px] items-center justify-center text-center border rounded-xl outline-none py-5 bg-[#55637B] text-white text-sm "
                  >
                    Verify Account
                  </button>
                </div>

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-white">
                  <p>Didn&apos;t recieve code?</p>
                  <Otptimer text="" onResend={handleReset} seconds={60} />
                </div>
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
  );
};

export default ResetPasswordOtpForm;
