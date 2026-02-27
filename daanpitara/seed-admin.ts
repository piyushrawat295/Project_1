import { db } from './lib/db';
import { users } from './lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

async function seedAdmin() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const existingAdmin = await db.select().from(users).where(eq(users.email, 'admin@daanpitara.com')).limit(1);

    if (existingAdmin.length === 0) {
        await db.insert(users).values({
            name: 'Super Admin',
            email: 'admin@daanpitara.com',
            password: hashedPassword,
            role: 'admin',
        });
        console.log('Seeded admin@daanpitara.com with password admin123');
    } else {
        // Force update the password just in case
        await db.update(users).set({ password: hashedPassword, role: 'admin' }).where(eq(users.email, 'admin@daanpitara.com'));
        console.log('Updated existing admin password to admin123 and ensured role is admin');
    }
}
seedAdmin().catch(console.error);
