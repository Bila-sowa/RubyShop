import { Router } from 'express';
import { healthRouter } from '#backend/modules/health/health.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
