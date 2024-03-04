import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import ApiError from "./ApiError";


export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
