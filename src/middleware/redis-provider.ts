import { Request, Response, NextFunction } from 'express';
import { getRedis } from '../db/redis-connector';

export async function provideRedis(req: Request, res: Response, next: NextFunction) {
    req.redis = await getRedis(process.env.REDIS_CACHE_URI);
    next();
}
