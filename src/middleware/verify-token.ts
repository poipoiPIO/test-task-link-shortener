import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function verify(req: Request, res: Response, next: NextFunction) {
    const auth = req.header('Authorization');
    const token = auth && auth.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied!!!');
    }

    try {
        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        req.user = jwtPayload;
        req.userId = jwtPayload?.id;

        next();
    } catch (_) {
        return res.status(400).send('Invalid token!!!');
    }
}
