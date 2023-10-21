import { createClient } from 'redis';

export const getRedis = async (url: string) => {
    return await createClient({ url: url })
        .on('error', (err) => console.log('Redis Client Error', err))
        .connect();
};
