import { verifyBDEUserMobile } from "@/service/axios-services/dataFetching";
import userInputValidation from "./input-validation";
import { Dispatch, SetStateAction } from "react";
import { ToastMessageProp } from "@/components/custom/custom-toast";

const verifyBDEUser = async (
  phoneNumber: string,
  failed: ({ message }: ToastMessageProp) => void,
  callback: any
) => {
  try {
    const user = await verifyBDEUserMobile(phoneNumber);
    if (user) {
      callback(user);
    }
    callback(null);
  } catch (error) {
    console.log(error);
    failed({
      message: "Something went wrong. Please try again",
    });
  }
};

export default verifyBDEUser;
