process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT:', err.message, err.stack);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    console.error('UNHANDLED REJECTION:', reason);
    process.exit(1);
});

import express, { type Request, type Response } from 'express'
import { connectRedis, redisClient } from './config/redis.js';
import { emailQueue } from './queues/email.queue.js';
import emailRoutes from './routes/email.route.js'


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Server Started");
});

// ============ Testing Redis ========

app.get('/testRedis',async(req:Request,res:Response)=>{
    await redisClient.set('name','Rahul',{
        EX: 60
    })
    const value = await redisClient.get('name');

    res.json({
        value
    })
})
console.log("Loading add-job route...");

//============ Testing Qeueu  using lPush, lRange and RPOP ==========

app.get('/add-job',async(req:Request,res:Response)=>{
  const job ={
    to: "test@gmail.com",
    subject: "hello",
    createdAt: Date.now()
  };    

  await redisClient.lPush(
    'emailQueue',
    JSON.stringify(job)
  );

  res.send('Job Added')
})

app.get('/jobs',async(req:Request,res:Response)=>{
    const jobs  = await redisClient.lRange(
        'emailQueue',
        0,
        -1
    );
    
    res.send(jobs)
});

app.get('/process-job', async(req:Request,res:Response)=>{
    const jobs = await redisClient.lPop(
        'emailQueue'
    );

    if(!jobs){
        return res.send('No jobs found');
    }

    console.log('Processing',JSON.parse(jobs));

    res.send('Job Processed')
})



// ============= Routes ==========
app.use('/api/queue',emailRoutes)

async function startServer() {

    try {
        await connectRedis();
    } catch (err) {
        console.error('Redis connection failed:', err);
    }
    
    app.listen(Number(PORT), '0.0.0.0', () => {
        console.log(`Server started at:${PORT}`);
    });
};

startServer();