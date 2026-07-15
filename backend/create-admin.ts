import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@must.homes';
  const password = 'AdminPassword123!';
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: Role.ADMIN,
      isVerified: true,
      isActive: true,
    },
    create: {
      email,
      firstName: 'System',
      lastName: 'Admin',
      passwordHash,
      role: Role.ADMIN,
      isVerified: true,
      isActive: true,
    },
  });

  console.log(`Admin user created/updated successfully!`);
  console.log(`Email: ${admin.email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
