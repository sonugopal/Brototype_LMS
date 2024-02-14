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
  e: any,
  setDisableButton: Dispatch<SetStateAction<boolean>>
) => {
  // Define the handlePasswordReset function
  const handlePasswordReset = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior

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
            "The password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      }
    } else {
      setDisableButton(false);
      failed({ message: "The passwords do not match. Please check." });
    }
  };

  // Call the handlePasswordReset function
  handlePasswordReset(e);
};

// Export the PasswordReset function
export default PasswordReset;
