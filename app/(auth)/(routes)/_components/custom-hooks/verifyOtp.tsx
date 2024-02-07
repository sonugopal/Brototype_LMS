import { CreateUser, VerifyOtp } from '@/service/axios-services/dataFetching';

const VerifyOtpFunction = (state: string[], phoneNumber: string, firstName: string, lastName: string, email: string, qualification: string, password: string, successToast: any, customToast: any, router: any) => {

    const verifyOtp = async () => {
        try {
            const otp = state.join('')
            const response = await VerifyOtp(phoneNumber, otp)
            if (response.status == 200) {
                const createUser = await CreateUser({ phoneNumber: phoneNumber, firstName: firstName, lastName: lastName, email: email, qualification: qualification, password: password, role: 0 })
                if (createUser.status == 201) {
                    await successToast({ message: 'Your OTP has been verified' })
                    return true
                }
            } else {
                await customToast({ message: 'Invalid OTP please try again!!' })
                return false
            }
        } catch (error: any) {
            await customToast({ message: 'Invalid OTP please try again!!' })
        }
    };

    const handleVerifyToken = async () => {
        const final_otp = state.join('')
        if (final_otp.length == 4) {
            const verify = await verifyOtp()
            if (verify) {
                router.push('sign-in')
            } else {
                customToast({ message: 'Something went wrong!!!' })
            }
        } else {
            customToast({ message: 'Some field of the OTP seems to be missing' })
        }
    }
    handleVerifyToken()
};

export default VerifyOtpFunction;