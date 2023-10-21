import { Request, Response } from 'express';

export const sampleController = async (req: Request, res: Response) => {
    res.status(200).json({
        data: 'This is only accessible using JWT',
        user: req.user
    });
};
