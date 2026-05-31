import express, { type Request, type Response } from 'express'
import { connectRedis, redisClient } from './config/redis.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Server Started");
});

// ============ Testing Redis ========

app.get('/testRedis',async(req:Request,res:Response)=>{
    await redisClient.set('name','Rahul')
    const value = await redisClient.get('name');

    res.json({
        value
    })
})

async function startServer() {

    await connectRedis();
    
    app.listen(PORT, () => {
        console.log(`Server started at:${PORT}`);
    });
};

startServer();