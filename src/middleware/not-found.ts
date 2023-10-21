import { Response, Request } from 'express';

export const notFound = (_: Request, res: Response) => {
    res.status(404).send("It's so sad, but route was not found!");
};
