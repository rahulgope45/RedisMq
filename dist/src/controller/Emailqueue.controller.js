import express, {} from 'express';
import { emailQueue } from '../queues/email.queue.js';
import { redisClient } from '../config/redis.js';
// ===== creating Job ====
export const emailJob = async (req, res) => {
    const job = await emailQueue.add('send-email', {
        to: "test@gmail.com",
        subject: "Bullmq test",
    }, {
        attempts: 3,
        backoff: {
            type: "fixed",
            delay: 5000
        },
        removeOnComplete: true
    });
    res.json({
        id: job.id
    });
};
//# sourceMappingURL=Emailqueue.controller.js.map