import { Worker } from "bullmq";
const worker = new Worker('emailQueue', async (job) => {
    console.log('Processing Job', job.id);
    console.log('Data', job.data);
    // ==== Simmulating Email Sending ====
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Email Sent');
    return {
        success: true
    };
}, {
    connection: {
        host: 'localhost',
        port: 6379
    }
});
console.log('Worker Started');
//# sourceMappingURL=email.worker.js.map