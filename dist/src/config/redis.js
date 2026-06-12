import { createClient } from "redis";
const redisConnectionUrl = process.env.REDIS_URL;
if (!redisConnectionUrl) {
    console.error("CRITICAL ERROR: REDIS_URL environment variable is missing!");
}
export const redisClient = createClient({
    url: redisConnectionUrl
});
redisClient.on('error', (err) => {
    console.log('Redis error:', err);
});
export async function connectRedis() {
    await redisClient.connect();
    console.log("Redis connected");
}
//# sourceMappingURL=redis.js.map