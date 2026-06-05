import { Worker } from "bullmq";
const worker = new Worker('emailQueue', async (job) => {
    console.log('Processing Job', job.id);
    console.log('Data', job.data);
    console.log(`Attempt: ${job.attemptsMade + 1}`);
    // ==== Simmulating Email Sending ====
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // ==== Simulating a error in Worker
    // if(Math.random() > 0.1){
    //     console.log("SMPT Error!");
    //     throw new Error("Email provided failed");
    // }
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
worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed `, new Date().toLocaleTimeString());
});
worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} failed: ${err.message}`);
});
console.log('Worker Started');
//# sourceMappingURL=email.worker.js.map