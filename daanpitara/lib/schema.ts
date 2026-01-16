import { pgTable, serial, text, timestamp, pgEnum, boolean, doublePrecision, integer } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'ngo', 'user', 'caller_agent']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'), // Made nullable for social auth
  role: roleEnum('role').default('user').notNull(),
  image: text('image'),
  phoneNumber: text('phone_number'),
  bio: text('bio'),
  location: text('location'),
  organizationName: text('organization_name'),
  otpCode: text('otp_code'),
  otpExpiresAt: timestamp('otp_expires_at'),
  provider: text('provider').default('credentials'), // credentials, google, linkedin
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const ngos = pgTable('ngos', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  registrationNumber: text('registration_number'),
  foundedYear: text('founded_year'),
  teamSize: text('team_size'),
  headquarters: text('headquarters'),
  description: text('description'),
  focusAreas: text('focus_areas').array(),
  lat: doublePrecision('lat'),
  lng: doublePrecision('lng'),
  verified: boolean('verified').default(false),
  paymentClear: boolean('payment_clear').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type NGO = typeof ngos.$inferSelect;
export type NewNGO = typeof ngos.$inferInsert;
