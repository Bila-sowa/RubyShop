import pino from 'pino';
import { env, isProduction } from '#backend/config/env.js';

export const logger = pino({
  level: env.LOG_LEVEL,
  ...(isProduction ? {} : { transport: { target: 'pino-pretty', options: { colorize: true } } }),
});
