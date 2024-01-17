import { validateMobile, validatePassword } from "@/components/validations";



const userInputValidation = (firstName: string, phoneNumber: string, password: string, confirmPassword: string, failed: any) => {
    const handleInputFields = () => {
        if ((firstName && phoneNumber) && password === confirmPassword) {
            let new_number = '+91' + phoneNumber
            if (validateMobile(new_number)) {
                if (validatePassword(password)) {
                    return true
                } else {
                    failed({ message: 'Your password does not follow the pattern required, it should have a capital, small, a number and a special character' })
                }
            } else {
                failed({ message: 'There seem to be something wrong with your mobile number please check again' })
            }
        } else {
            failed({ message: 'either the passwords are not matching or the username field and mobile fields are empty' })
        }
    }

    return {  };
};

export default userInputValidation;