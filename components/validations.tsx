export function validateMobile(mobile: string) {
    const mobileRegex = /^\d{12}$/;
    return mobileRegex.test(mobile);
}

export function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    return passwordRegex.test(password);
}


export function validateOtp(otp: string) {
    const otpRegex = /^\d{4}$/;
    return otpRegex.test(otp);
}

export function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
}
