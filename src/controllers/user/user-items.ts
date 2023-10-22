import { Response, Request } from 'express';
import { postResourceSchema } from './schemas';
import { ObjectId } from 'mongoose';
import { nanoid } from 'nanoid';
import UserHistoryItem from '../../models/UserHistoryItem';
import ResponseUserHistoryItem from '../../models/dto/ResponseUserHistoryItem';
import { RedisClientType } from 'redis';

export const getUserItems = async (req: Request, res: Response) => {
    if (!req.userId) {
        return res.status(401).send('Unauthorized');
    }

    const historyItems = await UserHistoryItem.find({ userId: req.userId });
    const historyItemsRepresentation = historyItems.map((item) =>
        ResponseUserHistoryItem.fromUserHistoryItemFactory(item)
    );

    return res.status(200).json({
        items: historyItemsRepresentation
    });
};

const tryGetItemAlreadyExistItem = async (userId: ObjectId, originalURI: string) => {
    const existedResource = await UserHistoryItem.findOne({
        userId: userId,
        originalURI: originalURI
    });

    if (!existedResource) {
        return;
    }

    return ResponseUserHistoryItem.fromUserHistoryItemFactory(existedResource);
};

type KeyProvider = () => string;
const addUserItem = async (
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

export const postUserItem = async (req: Request, res: Response) => {
    const { userId, redis } = req;

    if (!userId) {
        return res.status(401).send('Unauthorized');
    }

    const validatedRequest = await postResourceSchema.safeParseAsync(req.body);
    if (!validatedRequest.success) {
        return res.status(400).send(validatedRequest.error);
    }

    const existedItem = await tryGetItemAlreadyExistItem(userId, validatedRequest.data.url);
    const respItem = existedItem || (await addUserItem(redis, userId, validatedRequest.data.url));
    res.status(200).json(respItem);
};
