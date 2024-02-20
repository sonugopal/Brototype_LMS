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
  setMobile: Dispatch<SetStateAction<boolean>>,
  setPhoneNumber: Dispatch<SetStateAction<string>>,
  setFirstName: Dispatch<SetStateAction<string>>,
  setLastName: Dispatch<SetStateAction<string>>,
  setIsAdmin: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const userValidation = await SignUpValidation(phoneNumber);
    const admin = await verifyAdminMobile(phoneNumber);
    setMobile(true);
    if (admin) {
      setPhoneNumber(admin.phoneNumber);
      setFirstName(admin.firstName);
      setLastName(admin.lastName);
      setIsAdmin(true);
    }
  } catch (error) {
    failed({
      message: "A user with the given phone number already exists",
    });
  }
};

export default verifyAdmin;
