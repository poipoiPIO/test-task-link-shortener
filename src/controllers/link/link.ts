import { Request, Response } from 'express';
import { getLinkFromCache, getLinkFromDb } from './helpers';

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
