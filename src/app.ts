import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './api/v1/routes/index';
import ApiError from "./errors/ApiError";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ error: err.message });
    } else {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default app;
