import { Queue } from "bullmq";
import { redisConnection } from "../config/bullmq.js";
export const emailQueue = new Queue('emailQueue', {
    connection: redisConnection
});
//# sourceMappingURL=email.queue.js.map