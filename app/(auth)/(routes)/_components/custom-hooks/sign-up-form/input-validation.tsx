import { validateMobile, validatePassword } from "@/components/validations";



const userInputValidation = (firstName: string, phoneNumber: string, password: string, confirmPassword: string, failed: any) => {
    const handleInputFields = () => {
        if (!firstName) {
            failed({ message: 'The first name field is empty.' });
            return false;
        }
        if (!phoneNumber) {
            failed({ message: 'The phone number field is empty.' });
            return false;
        }
        if (password !== confirmPassword) {
            failed({ message: 'The passwords do not match.' });
            return false;
        }
        if (!validateMobile(phoneNumber)) {
            failed({ message: 'There seems to be something wrong with your mobile number. Please check again.' });
            return false;
        }
        if (!validatePassword(password)) {
            failed({ message: 'Your password does not follow the required pattern. It should include an uppercase letter, a lowercase letter, a number, and a special character.' });
            return false;
        }
        return true;
    }
    return handleInputFields();
};

export default userInputValidation;
