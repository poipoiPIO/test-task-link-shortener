import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function verify(req: Request, res: Response, next: NextFunction) {
    const auth = req.header('Authorization');
    const token = auth && auth.split(' ')[1];
    console.log(token, auth);
    if (!token) {
        return res.status(401).send('Access denied!!!');
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (_) {
        return res.status(400).send('Invalid token!!!');
    }
}
