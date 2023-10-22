import { registerSchema } from '../controllers/user/schemas';
import { Request, Response, NextFunction } from 'express';

import User from '../models/User';

type RequestBody = {
    login: string;
};

export async function registerValidation(req: Request, res: Response, next: NextFunction) {
    const parsed = await registerSchema.safeParseAsync(req.body);
    if (!parsed.success) {
        res.status(400).send(parsed.error);
        return;
    }

    const { login }: RequestBody = req.body;
    const loginExist = await User.findOne({ login: login });
    if (loginExist) {
        res.status(400).send('Email already exists!!!');
        return;
    }

    next();
}
