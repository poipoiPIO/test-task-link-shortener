import { nanoid } from 'nanoid';
import UserHistoryItem from '../../../models/UserHistoryItem';
import ResponseUserHistoryItem from '../../../models/dto/ResponseUserHistoryItem';
import { RedisClientType } from 'redis';
import { ObjectId } from 'mongoose';

type KeyProvider = () => string;
export const addUserItem = async (
    redis: RedisClientType,
    userId: ObjectId,
    originalURI: string,
    keyProvider: KeyProvider | undefined = undefined
) => {
    const shortLinkKey = (keyProvider && keyProvider()) || nanoid();
    const newItem = await new UserHistoryItem({
        shortLinkKey: shortLinkKey,
        originalURI: originalURI,
        userId: userId
    }).save();

    await redis.SET(shortLinkKey, originalURI);

    return ResponseUserHistoryItem.fromUserHistoryItemFactory(newItem);
};

export const tryGetItemAlreadyExistItem = async (userId: ObjectId, originalURI: string) => {
    const existedResource = await UserHistoryItem.findOne({
        userId: userId,
        originalURI: originalURI
    });

    if (!existedResource) {
        return;
    }

    return ResponseUserHistoryItem.fromUserHistoryItemFactory(existedResource);
};
