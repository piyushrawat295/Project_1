
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { pgTable, text, serial, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// Define schema (simplified for seeding)
export const roleEnum = pgEnum('role', ['admin', 'ngo', 'user', 'caller_agent']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'),
  role: roleEnum('role').default('user').notNull(),
  provider: text('provider').default('credentials'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

async function main() {
  console.log('Seeding users...');

  // Admin User
  const adminEmail = 'admin@daanpitara.com';
  const adminPassword = 'AdminPassword@123';
  const adminParsedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await db.select().from(users).where(eq(users.email, adminEmail));
  
  if (existingAdmin.length === 0) {
    await db.insert(users).values({
      name: 'System Admin',
      email: adminEmail,
      password: adminParsedPassword,
      role: 'admin',
      provider: 'credentials',
    });
    console.log(`Created Admin: ${adminEmail} / ${adminPassword}`);
  } else {
    // Optional: Update password
    await db.update(users).set({ password: adminParsedPassword, role: 'admin' }).where(eq(users.email, adminEmail));
     console.log(`Updated Admin: ${adminEmail} / ${adminPassword}`);
  }

  // Caller Agent User
  const callerEmail = 'caller@daanpitara.com';
  const callerPassword = 'CallerPassword@123';
  const callerParsedPassword = await bcrypt.hash(callerPassword, 10);

  const existingCaller = await db.select().from(users).where(eq(users.email, callerEmail));

  if (existingCaller.length === 0) {
    await db.insert(users).values({
      name: 'Support Caller',
      email: callerEmail,
      password: callerParsedPassword,
      role: 'caller_agent',
      provider: 'credentials',
    });
    console.log(`Created Caller: ${callerEmail} / ${callerPassword}`);
  } else {
      await db.update(users).set({ password: callerParsedPassword, role: 'caller_agent' }).where(eq(users.email, callerEmail));
     console.log(`Updated Caller: ${callerEmail} / ${callerPassword}`);
  }

  console.log('Seeding complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
