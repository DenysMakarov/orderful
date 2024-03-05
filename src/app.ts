import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';



import router from './api/v1/routes/index';
import {errorHandler} from "./errors/errorHandler";
import swaggerOptions from "./config/swaggerOptions";

const app: Express = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', router);

app.use(errorHandler);

export default app;
