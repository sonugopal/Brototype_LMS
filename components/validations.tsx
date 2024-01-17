export function validateMobile(mobile: string) {
    const mobileRegex = /^\+91\d{10}$/;
    return mobileRegex.test(mobile);
}

export function validatePassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}


export function validateOtp(otp: string) {
    const otpRegex = /^\d{4}$/;
    return otpRegex.test(otp);
}