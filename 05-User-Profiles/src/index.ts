import Redis from "ioredis";
import {Hono} from "hono";


const app = new Hono();

const redis = new Redis("redis://localhost:6379");

app.post('/user/hash/:id', async (c) => {
    const userId = c.req.param().id;
    const userDetails = await c.req.json();

    await redis.hset(`user:${userId}:hash`, userDetails);

    return c.json({
        success: true,
        message: "User data is saved"
    })
})

app.get('/user/:id', async (c) => {
    const userId = c.req.param().id;
    
    const userDetails = await redis.hgetall(`user:${userId}:hash`)

    return c.json({
        success: true,
        user: userDetails
    })
})

export default app;