// Import necessary functions and services
import { ToastMessageProp } from "@/components/custom/custom-toast";
import { validatePassword } from "@/components/validations";
import { UpdatePassword } from "@/service/axios-services/dataFetching";
import { Dispatch, SetStateAction } from "react";

// Define the PasswordReset function
const PasswordReset = (
  password: string,
  phoneNumber: string,
  confirmPassword: string,
  success: ({ message }: ToastMessageProp) => void,
  failed: ({ message }: ToastMessageProp) => void,
  push: any,
  setDisableButton: Dispatch<SetStateAction<boolean>>
) => {
  // Define the handlePasswordReset function
  const handlePasswordReset = async () => {
    // Check if the password and confirmPassword are the same
    if (password === confirmPassword) {
      // Validate the password
      if (validatePassword(password)) {
        // Update the password
        const update_password = await UpdatePassword(phoneNumber, password);

        // If the password is updated successfully
        if (update_password.status == 200) {
          await success({ message: "Your Password has been reset!!" });
          setDisableButton(false);
          await push("sign-in");
          return;
        }
        setDisableButton(false);
      } else {
        setDisableButton(false);
        failed({
          message:
            "The password should contain at least one number and one special character.\nMinimum length shoud be 6",
        });
      }
    } else {
      setDisableButton(false);
      failed({ message: "The passwords do not match. Please check." });
    }
  };

  // Call the handlePasswordReset function
  handlePasswordReset();
};

// Export the PasswordReset function
export default PasswordReset;
