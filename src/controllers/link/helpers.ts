import { RedisClientType } from 'redis';
import UserHistoryItem from '../../models/UserHistoryItem';

export const getLinkFromCache = async (redis: RedisClientType, linkKey: string) => await redis.get(linkKey);

export const getLinkFromDb = async (linkKey: string) => {
    const linkFromUserItems = await UserHistoryItem.findOne({ shortLinkKey: linkKey });
    return linkFromUserItems && linkFromUserItems.originalURI;
};
