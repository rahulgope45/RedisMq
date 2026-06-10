import express, {} from 'express';
import { emailQueue } from '../queues/email.queue.js';
import { redisClient } from '../config/redis.js';
// ===== creating Job ====
export const emailJob = async (req, res) => {
    const scheduledTime = new Date(req.query.time);
    const { to, subject } = req.body;
    const delay = scheduledTime.getTime() - Date.now();
    // ======safety check for user input =======
    if (delay < 0) {
        return res.status(400).json({
            message: 'The delay should always in future not past'
        });
    }
    ;
    console.log(`Creating Job with delay ${delay}`);
    const job = await emailQueue.add('send-email', {
        to,
        subject,
    }, {
        attempts: 3,
        backoff: {
            type: "fixed",
            delay: 0
        },
        delay,
        removeOnComplete: true
    });
    res.json({
        id: job.id
    });
};
//# sourceMappingURL=Emailqueue.controller.js.map