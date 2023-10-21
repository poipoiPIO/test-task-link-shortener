import { Response, Request, NextFunction, Errback } from 'express';

export async function errorHandlerMiddleware(_err: Errback, _req: Request, res: Response, _next: NextFunction) {
    return res.status(500).json({
        msg: 'Something went wrong, please try again'
    });
}
