import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import User from '../models/User';

type RequestBody = {
    login: string;
    password: string;
};

const loginSchema = z
    .object({
        login: z.string().min(1),
        password: z.string().min(6)
    })
    .strict();

export async function loginValidation(req: Request, res: Response, next: NextFunction) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).send(parsed.error);
        return;
    }

    const { login, password }: RequestBody = req.body;
    const user = await User.findOne({ login: login });
    if (user && (await bcrypt.compare(password, user.password))) {
        req.userId = user._id;
        next();
        return;
    }

    res.status(400).send('Invalid login or Password!!!');
}
