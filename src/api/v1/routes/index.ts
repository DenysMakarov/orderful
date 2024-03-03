import express, { Router } from 'express';
import converterRouter from './converter.routes'; // Ensure path is correct

const router: Router = Router();

router.use('/v1', converterRouter);

export default router;
