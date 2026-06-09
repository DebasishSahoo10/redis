import Redis from "ioredis";
import {Hono} from "hono";


const app = new Hono();

const redis = new Redis("redis://localhost:6379");

const EMAIL_QUEUE_KEY = 'queue:emails';

app.post('/email', async (c) => {
    const {to, subject, body} = await c.req.json();
    const emailPayload = {
        to,
        subject,
        body
    };
    await redis.lpush(EMAIL_QUEUE_KEY, JSON.stringify(emailPayload));

    return c.json({
        success: true,
        message: "Email added to the sending list"
    })
})

app.get('/emails/process-one', async (c) => {
    const rawJob = await redis.rpop(EMAIL_QUEUE_KEY);
    if (!rawJob) {
        return c.json({
            success: true,
            message: "No emails in queue"
        })
    }
    // simulate email sending process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const job = JSON.parse(rawJob);

    return c.json({
        success: true,
        message: "Email sent",
        job: job
    })
})


export default app;