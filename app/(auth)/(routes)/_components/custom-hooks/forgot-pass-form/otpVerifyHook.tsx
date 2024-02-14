import { ToastMessageProp } from "@/components/custom/custom-toast";
import { validateMobile } from "@/components/validations";
import {
  ValidatePhoneNumber,
  VerifyOtp,
} from "@/service/axios-services/dataFetching";
import { Dispatch, SetStateAction } from "react";

const OtpVerifyHook = (
  state: any,
  phoneNumber: string,
  success: ({ message }: ToastMessageProp) => void,
  failed: ({ message }: ToastMessageProp) => void,
  setToggle: Dispatch<SetStateAction<boolean>>,
  setDisableButton: Dispatch<SetStateAction<boolean>>
) => {
  const handleSendMobile = async () => {
    try {
      if (validateMobile(phoneNumber)) {
        const checkPhone = await ValidatePhoneNumber(phoneNumber);
        if (checkPhone.status == 200) {
          const otp = state.join("");
          const request = await VerifyOtp(phoneNumber, otp);
          if (request.status == 200) {
            await success({ message: "Your OTP has been verified" });
            setDisableButton(false);
            setToggle(true);
          }
        } else {
          setDisableButton(false);
          failed({ message: "A User with this number doesn't exist" });
        }
      } else {
        setDisableButton(false);
        failed({
          message:
            "There is something wrong with the given mobile number. Please try again",
        });
      }
    } catch (error) {
      setDisableButton(false);
      failed({
        message:
          "There is something wrong with your request. Please check again",
      });
    }
  };

  handleSendMobile();
};

export default OtpVerifyHook;
