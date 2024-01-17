import { CreateUser, Sendotp } from '@/service/axios-services/dataFetching';
import userInputValidation from './input-validation';

const useSendOtp = (firstName: string, lastName: string, phoneNumber: string, password: string, confirmPassword: string, success: any, failed: any, toggle: boolean, setToggle: any) => {
    const handleSendOTP = async () => {
        const verify = userInputValidation(firstName, phoneNumber, password, confirmPassword, failed)
        if (verify) {
            try {
                const request = await Sendotp({ phoneNumber: `+91${phoneNumber}` })
                if (request.status == 200) {
                    await success({message: 'An otp has been send to your mobile number'})
                    verify && setToggle(!toggle)
                } else {
                    failed({ message: "The otp service is down for the moment" })
                }
            } catch (error) {
                failed({ message: 'A user with the given phone number already exists!!' })
            }
        }
    }
    handleSendOTP()
};

export default useSendOtp;