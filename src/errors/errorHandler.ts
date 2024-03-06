import {Request, Response} from 'express';
import ApiError from "./ApiError";


export const errorHandler = (err: unknown, req: Request, res: Response) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
