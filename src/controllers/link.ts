import { RedisClientType } from 'redis';
import { getRedis } from '../db/redis-connector';
import UserHistoryItem from '../models/UserHistoryItem';

import { Request, Response } from 'express';

export const sampleController = async (req: Request, res: Response) => {
    res.status(200).json({
        data: 'This is only accessible using JWT',
        user: req.user
    });
};

const getLinkFromCache = async (redis: RedisClientType, linkKey: string) => {
    return await redis.get(linkKey);
};

const getLinkFromDb = async (linkKey: string) => {
    const linkFromUserItems = await UserHistoryItem.findOne({ shortLinkKey: linkKey });
    return linkFromUserItems && linkFromUserItems.originalURI;
};

export const getLinkController = async (req: Request, res: Response) => {
    const linkKey = req.params.linkKey || '';
    const originalURI = linkKey && ((await getLinkFromCache(req.redis, linkKey)) || (await getLinkFromDb(linkKey)));

    if (!originalURI) {
        return res.status(404).json({
            data: 'Link is not found!'
        });
    }

    res.redirect(originalURI);
};
