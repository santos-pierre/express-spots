import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const admin_role = await prisma.role.create({ data: { name: 'admin' } });
    await prisma.role.create({ data: { name: 'member' } });

    const hashedPassword = await bcrypt.hash('password', 10);

    await prisma.user.create({
        data: {
            email: 'admin@admin.com',
            name: 'Admin',
            password: hashedPassword,
            roles: { create: { role_id: admin_role.id } },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
