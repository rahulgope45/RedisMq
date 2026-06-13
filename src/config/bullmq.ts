const redisUrl = new URL(process.env.REDIS_URL || 'redis://redis:6379');

export const redisConnection = {
    host: redisUrl.hostname,
    port: Number(redisUrl.port),
    password: redisUrl.password || undefined,
    tls: redisUrl.protocol === 'rediss:' ? {} : undefined
}