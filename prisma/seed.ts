import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, RoleType } from '@prisma/client';

const roleNames: RoleType[] = [
  RoleType.ADMIN,
  RoleType.ANALYST,
  RoleType.VIEWER,
];

async function main() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  const prisma = new PrismaClient({ adapter });

  try {
    for (const name of roleNames) {
      await prisma.role.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }

    console.log(`Seeded ${roleNames.length} roles successfully.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('Role seeding failed.', error);
  process.exit(1);
});
