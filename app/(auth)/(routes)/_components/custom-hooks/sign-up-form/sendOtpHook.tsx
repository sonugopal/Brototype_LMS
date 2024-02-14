import {
  Sendotp,
  SignUpValidation,
  ValidatePhoneNumber,
} from "@/service/axios-services/dataFetching";
import userInputValidation from "./input-validation";
import { Dispatch, SetStateAction } from "react";
import { ToastMessageProp } from "@/components/custom/custom-toast";

const SendOtp = (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  qualification: string,
  password: string,
  confirmPassword: string,
  success: ({ message }: ToastMessageProp) => void,
  failed: ({ message }: ToastMessageProp) => void,
  toggle: boolean,
  setToggle: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setDisableButton: Dispatch<SetStateAction<boolean>>
) => {
  const handleSendOTP = async () => {
    const verify = userInputValidation(
      firstName,
      lastName,
      phoneNumber,
      email,
      qualification,
      password,
      confirmPassword,
      failed,
      setDisableButton,
      setLoading
    );
    if (verify) {
      try {
        const userValidation = await SignUpValidation(phoneNumber);
        if (userValidation.status == 200) {
          const request = await Sendotp({ phoneNumber: phoneNumber });
          if (request.status == 200) {
            await success({
              message: "An otp has been send to your mobile number",
            });
            setLoading(false);
            setDisableButton(false);
            verify && setToggle(!toggle);
            return;
          } else {
            setLoading(false);
            setDisableButton(false);
            failed({ message: "The OTP Service is down at the moment" });
          }
        } else {
          setLoading(false);
          setDisableButton(false);
          failed({
            message: "A user with the given phone number already exists",
          });
        }
      } catch (error) {
        setLoading(false);
        setDisableButton(false);
        failed({
          message: "A user with the given phone number already exists",
        });
      }
    }
  };
  handleSendOTP();
};

export default SendOtp;
