import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';

const prisma = new PrismaClient();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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

    const querySessionTable = `CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE);

      ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

      CREATE INDEX "IDX_session_expire" ON "session" ("expire");`;

    await pool.query(querySessionTable);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
