declare namespace Express {
    import { RedisClientType } from 'redis';
    export interface Request {
        userId?: string;
        user?: string | Object;
        redis?: RedisClientType;
    }
}
