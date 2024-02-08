import { CreateUser, Sendotp } from '@/service/axios-services/dataFetching';

const ResendOtp = (phoneNumber: string, firstName:string, lastName:string, email:string, qualification:string, password:string,  success: any, failed: any) => {
    const handleResendToken = async () => {
        try {
            const request = await Sendotp({ phoneNumber: phoneNumber })
            if (request.status == 200) {
                const createUser = await CreateUser({ phoneNumber: phoneNumber, firstName: firstName, lastName: lastName, email: email, qualification: qualification, password: password, role: 0 })
                if (createUser.status == 201){
                    await success({ message: "Your OTP has been resent. Please check your mobile." })
                }
            }
        } catch (error) {
            failed({ message: "Your OTP couldn't be sent due to some technical issue. Please try again later." })
        }
    }

    handleResendToken()
};

export default ResendOtp;