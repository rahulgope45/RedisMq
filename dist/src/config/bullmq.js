export const redisConnection = {
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_HOST?.includes('upstash') ? {} : undefined
};
//# sourceMappingURL=bullmq.js.map