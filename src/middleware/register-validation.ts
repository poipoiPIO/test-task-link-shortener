import { Request, Response, NextFunction } from 'express';

import { z } from 'zod';
import User from '../models/User';

const registerSchema = z
    .object({
        login: z.string().min(1),
        password: z.string().min(6)
    })
    .strict();

type RequestBody = {
    login: string;
};

export async function registerValidation(req: Request, res: Response, next: NextFunction) {
    const parsed = registerSchema.safeParse(req.body);
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
