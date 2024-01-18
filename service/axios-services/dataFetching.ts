
import apiService from '@/service/apiService'

interface loginProps {
    mobile: string
    password: string
}

// for fetching data in the login form
const login = async ({ mobile, password }: loginProps) => {
    try {
        const response = await apiService.post('api/auth/login', { mobile: mobile, password: password });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

interface createUserProps {
    phoneNumber: string
    firstName: string
    lastName: string
    password: string
    role: number
}

// for creating a new user
const CreateUser = async ({ phoneNumber, firstName, lastName, password, role }: createUserProps) => {
    try {
        const response = await apiService.post('api/user/register', { phoneNumber: phoneNumber, firstName: firstName, lastName:lastName, password: password, role:role })
        console.log(response, "from the create user")
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
}


interface sendOtpProps {
    phoneNumber: string
}

// for sending otp to a created user
const Sendotp = async ({ phoneNumber }: sendOtpProps) => {
    try {
        const response = await apiService.post('api/auth/send-otp', { phoneNumber: phoneNumber })
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// for verifying otp
const VerifyOtp = async (phoneNumber: string, otp: string) => {
    try {
        const response = await apiService.post('api/auth/verify-otp', { phoneNumber: phoneNumber, otp: otp })
        console.log("This is the respoinse from verify otp: ", await response)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

// for updating the password
const UpdatePassword = async (phoneNumber: string, password: string) => {
    try {
        const respone = await apiService.patch('api/auth/forgotpassword', { phoneNumber: phoneNumber, password: password })
        return respone
    } catch (error) {
        console.log(error)
        throw error
    }
}



const ForgotPassword = async (phoneNumber: string) => {
    try {
        const response = await apiService.post('api/auth/forgotpassword', { phoneNumber: phoneNumber })
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

const ValidatePhoneNumber = async (phoneNumber: string) => {
    try{
        const response = await apiService.post('api/user/validate-phone', {phoneNumber: phoneNumber})
        console.log("This is the response: ", response)
        return response
    }catch(error){
        console.log(error)
        throw error
    }
}


export { login, CreateUser, Sendotp, VerifyOtp, UpdatePassword, ForgotPassword, ValidatePhoneNumber };