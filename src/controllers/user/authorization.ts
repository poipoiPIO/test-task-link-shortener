import { Response, Request } from 'express';

import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type RequestBody = {
    login: string;
    password: string;
};

export const registerUserController = async (req: Request, res: Response) => {
    const { login, password }: RequestBody = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        login: login,
        password: hashedPassword
    });

    try {
        await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    const token = jwt.sign({ id: req.userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });

    res.header('Authorization', `Bearer ${token}`).send(token);
};
