import dotenv from 'dotenv';
dotenv.config();
import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL!
});

redisClient.on('error',(err)=>{
  console.log('Redis error:',err)
});

export async function connectRedis() {
    await redisClient.connect();
    console.log("Redis connected")
}
