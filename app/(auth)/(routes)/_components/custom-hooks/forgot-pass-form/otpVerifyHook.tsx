import { validateMobile } from '@/components/validations';
import { ValidatePhoneNumber, VerifyOtp } from '@/service/axios-services/dataFetching';

const OtpVerifyHook = (state:any, phoneNumber: string, success: any, failed: any, setToggle: any) => {
    const handleSendMobile = async () => {
        try {
            if (validateMobile(phoneNumber)) {
                const checkPhone = await ValidatePhoneNumber(phoneNumber)
                if (checkPhone.status == 200){
                    const otp = state.join('')
                    const request =  await VerifyOtp(phoneNumber, otp)
                    if (request.status == 200) {
                        await success({message: "Your OTP has been verified"})
                        setToggle(true)
                    }
                }else{
                    failed({ message: "A User with this number doesn't exist" })
                }
            } else {
                failed({ message: "There is something wrong with the given mobile number. Please try again" })
            }
        } catch (error) {
            failed({ message: "There is something wrong with your request. Please check again" })
        }
    }

    handleSendMobile()
};

export default OtpVerifyHook;