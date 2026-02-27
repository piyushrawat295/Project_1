import { db } from './lib/db';
import { users } from './lib/schema';
import { eq } from 'drizzle-orm';

async function checkAdmin() {
    const adminRows = await db.select().from(users).where(eq(users.email, 'admin@daanpitara.com'));
    console.log(JSON.stringify(adminRows, null, 2));
}
checkAdmin().catch(console.error);
