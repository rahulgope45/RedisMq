import { Queue } from "bullmq";
import { redisConnection } from "../config/bullmq.js";

export const emailQueue = new Queue('emailQueue', {
    connection: redisConnection
})

