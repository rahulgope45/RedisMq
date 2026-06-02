import express, { type Request, type Response } from 'express';
import { emailQueue } from '../queues/email.queue.js';
import { redisClient } from '../config/redis.js';


// ===== creating Job ====
export const  emailJob = async(req:Request,res:Response)=>{
    const job = await emailQueue.add(
        'send-email',
        {
            to: "test@gmail.com",
            subject: "Bullmq test",
        }
    );
    res.json({
        id: job.id
    })
};