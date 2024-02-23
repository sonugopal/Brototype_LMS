import { ToastMessageProp } from "@/components/custom/custom-toast";
import {
  validateEmail,
  validateMobile,
  validatePassword,
} from "@/components/validations";
import { Dispatch, SetStateAction } from "react";

const userInputValidation = (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  password: string,
  confirmPassword: string,
  failed: ({ message }: ToastMessageProp) => void,
  setDisableButton: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const handleInputFields = () => {
    if (!firstName) {
      failed({ message: "The first name field is empty." });
      setDisableButton(false);
      setLoading(false);
      return false;
    }
    if (!phoneNumber) {
      failed({ message: "The phone number field is empty." });
      setDisableButton(false);
      setLoading(false);
      return false;
    }
    if (password !== confirmPassword) {
      failed({ message: "The passwords do not match." });
      setDisableButton(false);
      setLoading(false);
      return false;
    }
    if (!lastName) {
      failed({ message: "The lastName field is emtpy." });
      setDisableButton(false);
      setLoading(false);
      return false;
    }
    if (!email) {
      failed({ message: "The email field is emtpy." });
      setDisableButton(false);
      setLoading(false);
      return false;
    }
    if (!validateEmail(email)) {
      failed({ message: "Invalid email!!" });
      setDisableButton(false);
      setLoading(false);
      return false;
    }
    if (!validateMobile(phoneNumber)) {
      failed({
        message:
          "There seems to be something wrong with your mobile number. Please check again.",
      });
      setDisableButton(false);
      setLoading(false);
      return false;
    }
    if (!validatePassword(password)) {
      failed({
        message:
          "Your password does not follow the required pattern.\nIt should contain at least one number, and one special character.\nMinimum length should be 6.",
      });
      setDisableButton(false);
      setLoading(false);
      return false;
    }
    return true;
  };
  return handleInputFields();
};

export default userInputValidation;
