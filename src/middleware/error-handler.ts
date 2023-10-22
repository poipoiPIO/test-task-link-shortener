import { Response, Request, Errback, NextFunction } from 'express';

export async function errorHandlerMiddleware(
    _err: Errback,
    _req: Request,
    res: Response,
    _next: NextFunction // eslint-disable-line
) {
    return res.status(500).json({
        msg: 'Something went wrong, please try again'
    });
}
