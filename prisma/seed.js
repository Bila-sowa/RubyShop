import { prisma } from '#backend/lib/prisma.js';

await prisma.product.upsert({
  where: { slug: 'sample-product' },
  update: {},
  create: { slug: 'sample-product', name: 'Sample product', priceCents: 9900 },
});

await prisma.$disconnect();
