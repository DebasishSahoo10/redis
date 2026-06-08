import Redis from "ioredis";
import {Hono} from "hono";
import { generateOtp, otpKey } from "./utils";


const app = new Hono();

const redis = new Redis("redis://localhost:6379");

app.post('/otp', async (c) => {
    const reqBody = await c.req.json();
    const phoneNumberFromUser = reqBody.phone;
    const generatedOTP = generateOtp();

    await redis.set(otpKey(phoneNumberFromUser), generatedOTP, 'EX', 30)

    return c.json({
        success: true,
        message: `OTP Sent: ${generatedOTP}`
    })
})

app.post('/otp/verify', async (c) => {
    const reqBody = await c.req.json();
    const otpFromUser = reqBody.otp;
    const phoneFromUser = reqBody.phone;

    const storedOTP = await redis.get(otpKey(phoneFromUser))
    
    if (otpFromUser === storedOTP) {
        return c.json({
            success: true,
            message: "OTP verified succesfully"
        })
    } else {
        return c.json({
            success: true,
            message: "OTP verification failed. Please try again"
        })
    }
})

app.get('/otp/ttl', async (c) => {
    const {phoneFromUser} = c.req.query();

    if (!phoneFromUser) {
        return c.json({
            success: false,
            message: 'Missing phone query parameter'
        }, 400)
    }

    const ttl = await redis.ttl(otpKey(phoneFromUser))

    return c.json({
        success: true,
        message: `The TTL is: ${ttl}`
    })
})


export default app;