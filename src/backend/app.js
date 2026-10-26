import path from 'node:path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { env, isProduction } from '#backend/config/env.js';
import { logger } from '#backend/lib/logger.js';
import { apiRouter } from '#backend/routes.js';
import { notFound } from '#backend/middleware/not-found.js';
import { errorHandler } from '#backend/middleware/error-handler.js';
import { API_PREFIX } from '#shared/constants/index.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(pinoHttp({ logger }));
  app.use(express.json({ limit: '1mb' }));

  app.use(API_PREFIX, rateLimit({ windowMs: 60_000, limit: 300 }));
  app.use(API_PREFIX, apiRouter);
  app.use(API_PREFIX, notFound);

  if (isProduction) {
    const clientDir = path.resolve('dist/client');
    app.use(express.static(clientDir));
    app.get('/{*splat}', (_req, res) => res.sendFile(path.join(clientDir, 'index.html')));
  }

  app.use(errorHandler);
  return app;
}
