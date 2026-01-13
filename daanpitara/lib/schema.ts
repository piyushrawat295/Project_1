import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'ngo', 'user', 'caller_agent']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'), // Made nullable for social auth
  role: roleEnum('role').default('user').notNull(),
  organizationName: text('organization_name'),
  otpCode: text('otp_code'),
  otpExpiresAt: timestamp('otp_expires_at'),
  provider: text('provider').default('credentials'), // credentials, google, linkedin
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
