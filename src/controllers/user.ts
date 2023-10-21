import { Response, Request } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserHistoryItem from '../models/UserHistoryItem';

type RequestBody = {
    login: string;
    password: string;
};

export const registerUser = async (req: Request, res: Response) => {
    const { login, password }: RequestBody = req.body;
    const salt = await bcrypt.genSalt(10);
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

export const loginUser = async (req: Request, res: Response) => {
    const token = jwt.sign({ id: req.userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });

    res.header('Authorization', `Bearer ${token}`).send(token);
};

export const getUserHistory = async (req: Request, res: Response) => {
    const authedUser: any = req.user
    const userId = authedUser && authedUser?.id 

    if (!userId) {
        return res.status(401).send('Unauthorized');
    }
    
    const historyItems = await UserHistoryItem.find({ userId: userId });
    const historyItemsRepresentation = historyItems.map((item) => {
        const { userId, ...rest } = item;
        return rest;
    });

    return res.status(200).json({
        items: historyItemsRepresentation
    });
};
