export const otpKey = (phone:string) => {
    return `otp:${phone}`
}

export const generateOtp = (length = 4): string => {
    const max = 10 ** length
    const num = Math.floor(Math.random() * max)
    return num.toString().padStart(length, '0')
}