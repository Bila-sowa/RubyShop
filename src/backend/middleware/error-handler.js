import { logger } from '#backend/lib/logger.js';
import { isProduction } from '#backend/config/env.js';

export const errorHandler = (err, req, res, _next) => {
  const status = err.status ?? 500;
  if (status >= 500) logger.error({ err, url: req.originalUrl }, 'Unhandled error');

  res.status(status).json({
    error: {
      message: status >= 500 && isProduction ? 'Internal server error' : err.message,
      ...(err.details ? { details: err.details } : {}),
    },
  });
};
