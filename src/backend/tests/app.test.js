import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

vi.mock('#backend/lib/prisma.js', () => ({
  prisma: { $queryRaw: vi.fn().mockResolvedValue([{ '?column?': 1 }]) },
}));

const { createApp } = await import('#backend/app.js');

describe('API', () => {
  it('GET /api/health → 200', async () => {
    const res = await request(createApp()).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET unknown url (/api/nope)', async () => {
    const res = await request(createApp()).get('/api/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.message).toBe('Not found');
  });
});
