import { validateMobile } from '@/components/validations';
import { ForgotPassword, ValidatePhoneNumber } from '@/service/axios-services/dataFetching';

const SendToMobile = (mobile: string, success: any, failed: any, setToggle: any) => {
    const handleSendMobile = async () => {
        try {
            console.log("This is from the sendto mobile: ", mobile)
            if (validateMobile(mobile)) {
                const checkPhone = await ValidatePhoneNumber(mobile)
                if (checkPhone.status == 200){
                    const request = await ForgotPassword(mobile)
                    if (request.status == 200) {
                        await success({message: 'Your otp has been send!!'})
                        setToggle(true)
                    }
                }else{
                    failed({ message: 'There is no user with this number!!' })
                }
            } else {
                failed({ message: 'There is something wrong with your mobile number!!! Please check again' })
            }
        } catch (error) {
            failed({ message: 'There is something wrong with your request!!! Please check again' })
        }
    }

    handleSendMobile()
};

export default SendToMobile;