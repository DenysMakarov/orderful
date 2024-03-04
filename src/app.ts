import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import router from './api/v1/routes/index';
import Middleware from "./api/v1/middleware";
import {errorHandler} from "./errors/errorHandler";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

export default app;
