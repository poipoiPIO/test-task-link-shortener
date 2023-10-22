declare namespace Express {
    import { JwtPayload } from 'jsonwebtoken';
    import { RedisClientType } from 'redis';
    import { ObjectId } from 'mongoose';

    export interface Request {
        userId?: ObjectId;
        user?: string | JwtPayload;
        redis?: RedisClientType;
    }
}
