import { Router } from 'express';
import { prisma } from '#backend/lib/prisma.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ status: 'ok', uptime: process.uptime() });
});
