import { Response, Request } from 'express';
import { postResourceSchema } from '../schemas';
import UserHistoryItem from '../../../models/UserHistoryItem';
import ResponseUserHistoryItem from '../../../models/dto/ResponseUserHistoryItem';
import { addUserItem, tryGetItemAlreadyExistItem } from './helpers';

export const getUserItemsController = async (req: Request, res: Response) => {
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

export const postUserItemController = async (req: Request, res: Response) => {
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
