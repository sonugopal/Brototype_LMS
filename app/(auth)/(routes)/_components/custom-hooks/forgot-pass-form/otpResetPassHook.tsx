import { validateMobile } from '@/components/validations';
import { ForgotPassword, ValidatePhoneNumber } from '@/service/axios-services/dataFetching';

const SendToMobile = (mobile: string, success: any, failed: any, setToggle: any, setDisableButton: any) => {
    const handleSendMobile = async () => {
        try {
            if (validateMobile(mobile)) {
                const checkPhone = await ValidatePhoneNumber(mobile)
                if (checkPhone.status == 200) {
                    const request = await ForgotPassword(mobile)
                    if (request.status == 200) {
                        await success({ message: "Your otp has been send!!" })
                        setDisableButton(false)
                        setToggle(true)
                    }
                } else {
                    failed({ message: "There is no user with this number!!" })
                    setDisableButton(false)
                }
            } else {
                failed({ message: "There is something wrong with your mobile number!!! Please check again" })
                setDisableButton(false)
            }
        } catch (error) {
            failed({ message: "There is something wrong with your request!!! Please check again" })
            setDisableButton(false)
        }
    }

    handleSendMobile()
};

export default SendToMobile;