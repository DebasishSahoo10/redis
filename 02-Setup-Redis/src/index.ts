import Redis from "ioredis";
import mongoose from "mongoose";
import {Hono} from "hono";

const app = new Hono();

const mongourl = "mongodb://localhost:27017/mongo_for_redis";

const redis = new Redis("redis://localhost:6379");


app.get('/redis', async (c) => {
    const reply = await redis.ping();
    return c.json({
        ok: true,
        redis: reply
    })
})

app.get('/mongo', async (c) => {

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongourl);
    }

    return c.json({
        ok: true,
        mongo: 'connected',
        database: mongoose.connection.name
    })
})


export default app;