import {
  SignUpValidation,
  verifyAdminMobile,
} from "@/service/axios-services/dataFetching";
import userInputValidation from "./input-validation";
import { Dispatch, SetStateAction } from "react";
import { ToastMessageProp } from "@/components/custom/custom-toast";

const verifyAdmin = async (
  phoneNumber: string,
  failed: ({ message }: ToastMessageProp) => void,
  callback: any
) => {
  try {
    const admin = await verifyAdminMobile(phoneNumber);
    if (admin) {
      callback(admin);
    }
    callback(null);
  } catch (error) {
    console.log(error);
    failed({
      message: "Something went wrong. Please try again",
    });
  }
};

export default verifyAdmin;
