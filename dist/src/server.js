import express, {} from 'express';
import { connectRedis } from './config/redis.js';
const app = express();
app.use(express.json());
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Server Started");
});
async function startServer() {
    await connectRedis();
    app.listen(PORT, () => {
        console.log(`Server started at:${PORT}`);
    });
}
;
startServer();
//# sourceMappingURL=server.js.map