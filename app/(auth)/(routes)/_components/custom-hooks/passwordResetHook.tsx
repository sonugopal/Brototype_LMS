import { validateOtp, validatePassword } from '@/components/validations';
import { VerifyOtp, UpdatePassword } from '@/service/axios-services/dataFetching';

const usePasswordReset = (password: string, confirmPassword: string, otp: string, phoneNumber: string, success: any, failed: any, push: any, e:any) => {
    const handlePasswordReset = async (e:any) => {
        e.preventDefault()
        if (password === confirmPassword) {
            if (validatePassword(password)) {
                if (otp && validateOtp(otp)) { 
                    const response = await VerifyOtp(`+91${phoneNumber}`, otp)
                    if (response.status == 200) {
                        const update_password = await UpdatePassword(phoneNumber, password)
                        if (update_password.status == 200) {
                            await success({message: 'Your Password has been reset!!'})
                            push('sign-in')
                        }
                    } else {
                        failed({ message: "The otp provided is Invalid" })
                    }
                } else {
                    failed({ message: "The otp provided are wrong please try again" })
                }
            } else {
                failed({ message: "The password should atleast contain one uppercase one lower case 1 number and 1 special character" })
            }
        } else {
            failed({ message: 'The passwords does not match one another please check' })
        }
    }

    handlePasswordReset(e)

    return {  };
};

export default usePasswordReset;