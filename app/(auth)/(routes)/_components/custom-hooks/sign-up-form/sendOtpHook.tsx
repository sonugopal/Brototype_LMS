import {Sendotp, SignUpValidation, ValidatePhoneNumber } from '@/service/axios-services/dataFetching';
import userInputValidation from './input-validation';

const SendOtp = (firstName: string, lastName: string, phoneNumber: string, email:string, qualification: string, password: string, confirmPassword: string, success: any, failed: any, toggle: boolean, setToggle: any, setLoading: any) => {
    const handleSendOTP = async () => {
        const verify = await userInputValidation(firstName, lastName, phoneNumber, email, qualification, password, confirmPassword, failed)
        if (verify) {
            try {
              const userValidation = await SignUpValidation(phoneNumber)
              if (userValidation.status == 200){
                const request = await Sendotp({ phoneNumber: phoneNumber })
                if (request.status == 200) {
                    await success({message: "An otp has been send to your mobile number"})
                    setLoading(false)
                    verify && setToggle(!toggle)
                    return
                } else {
                    setLoading(false)
                    failed({ message: "The OTP Service is down at the moment" })
                }
              }else{
                setLoading(false)
                failed({ message: "A user with the given phone number already exists" })
              }
            } catch (error) {
                setLoading(false)
                failed({ message: "A user with the given phone number already exists" })
            }
        }
    }
    handleSendOTP()
};

export default SendOtp;