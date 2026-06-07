import Redis from "ioredis";
import {Hono} from "hono";
import { sanitizeBanner } from "./utils";

const app = new Hono();

const redis = new Redis("redis://localhost:6379");

const BANNER_KEY = "app:banner";

app.post('/banner', async (c) => {
    try {
        const bannerFromReq = await c.req.json();
        const sanitizedMessage = sanitizeBanner(bannerFromReq.message);
        await redis.set(BANNER_KEY, sanitizedMessage);
        return c.json({
            success: true,
            message: "Banner is set"
        });
    } catch (error) {
        return c.json({
            success: false,
            message: error instanceof Error ? error.message : 'Invalid banner data'
        }, 400);
    }
})

app.get('/banner', async (c) => {
    const banner = await redis.get(BANNER_KEY);
    return c.json({
        success: true,
        message: banner
    })
})

app.delete('/banner', async (c) => {
    await redis.del(BANNER_KEY);
    return c.json({
        success: true,
        message: "Banner is reset"
    })
})

app.get('/banner/exists', async (c) => {
    const exists = await redis.exists(BANNER_KEY);
    return c.json({
        success: true,
        message: Boolean(exists)
    })
})

export default app;