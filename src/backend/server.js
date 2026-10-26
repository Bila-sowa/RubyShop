import { env } from '#backend/config/env.js';
import { logger } from '#backend/lib/logger.js';
import { prisma } from '#backend/lib/prisma.js';
import { createApp } from '#backend/app.js';

const server = createApp().listen(env.PORT, () => {
  logger.info(`API listening on http://localhost:${env.PORT}`);
});

const shutdown = (signal) => {
  logger.info(`${signal} received, shutting down`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
