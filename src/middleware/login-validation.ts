import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../controllers/user/schemas';
import bcrypt from 'bcryptjs';
import User from '../models/User';

type RequestBody = {
    login: string;
    password: string;
};

export async function loginValidation(req: Request, res: Response, next: NextFunction) {
    const parsed = await loginSchema.safeParseAsync(req.body);
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
