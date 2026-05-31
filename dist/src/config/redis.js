import dotenv from 'dotenv';
dotenv.config();
import { createClient } from "redis";
export const redisClient = createClient({
    url: "redis://localhost:6379"
});
redisClient.on('error', (err) => {
    console.log('Redis error:', err);
});
export async function connectRedis() {
    await redisClient.connect();
    console.log("Redis connected");
}
//# sourceMappingURL=redis.js.map