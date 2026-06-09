import './worker';
import {Hono} from "hono";
import { emailQueue } from "./queue";

const app = new Hono();

app.post('/welcome-email', async (c) => {
    const {to, subject, body} = await c.req.json();
    await emailQueue.add("send_welcome_email", {to, subject, body},{attempts: 3, backoff: {type: "exponential", delay: 2000}});
    return c.json({message: "Email added to queue successfully", status: 200});
})

app.get('/email-sending-stats', async (c) => {
    const stats = await emailQueue.getJobCounts();
    return c.json({stats, status: 200});
})

export default app;