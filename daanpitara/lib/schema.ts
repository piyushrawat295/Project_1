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
  foundedYear: text('founded_year'), // Keep for backward compat, maybe migrate to establishedYear
  establishedYear: integer('established_year'),
  teamSize: text('team_size'),
  headquarters: text('headquarters'),
  description: text('description'),
  focusAreas: text('focus_areas').array(),
  operationalStates: text('operational_states').array(),
  operationalDistricts: text('operational_districts').array(),
  vision: text('vision'),
  mission: text('mission'),
  objectives: text('objectives'),
  panNumber: text('pan_number'),
  type: text('type'), // Trust, Society, Section 8, etc.
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

// ... existing documents table ...
export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  url: text('url').notNull(),
  status: text('status').default('pending').notNull(),
  expiryDate: timestamp('expiry_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


// ... (events, beneficiaries, projects, boardMembers, teamMembers are here)

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  action: text('action').notNull(), 
  details: text('details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  receiverId: integer('receiver_id').references(() => users.id).notNull(),
  senderName: text('sender_name').notNull(),
  senderAvatar: text('sender_avatar'),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  title: text('title').notNull(),
  raisedAmount: doublePrecision('raised_amount').default(0),
  goalAmount: doublePrecision('goal_amount').notNull(),
  status: text('status').default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const csrOpportunities = pgTable('csr_opportunities', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  companyName: text('company_name').notNull(),
  sector: text('sector').notNull(),
  location: text('location'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const proposals = pgTable('proposals', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  opportunityId: integer('opportunity_id').references(() => csrOpportunities.id).notNull(),
  status: text('status').default('submitted'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  title: text('title').notNull(),
  date: timestamp('date').notNull(),
  location: text('location'),
  beneficiariesCount: integer('beneficiaries_count').default(0),
  description: text('description'),
  status: text('status').default('upcoming'), // upcoming, ongoing, past
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const beneficiaries = pgTable('beneficiaries', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  name: text('name').notNull(),
  age: integer('age'),
  gender: text('gender'), // Male, Female, Other
  category: text('category'), // Child, Women, Elderly, etc.
  projectId: integer('project_id'), // Optional link to a project
  location: text('location'),
  registeredAt: timestamp('registered_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  title: text('title').notNull(),
  sector: text('sector'),
  location: text('location'),
  status: text('status').default('active'), // active, completed, seeking_funding
  totalBudget: doublePrecision('total_budget').default(0),
  raisedAmount: doublePrecision('raised_amount').default(0),
  beneficiariesTargeted: integer('beneficiaries_targeted').default(0),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const boardMembers = pgTable('board_members', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(), // Chairman, Secretary, etc.
  email: text('email'),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(), // Project Manager, Field Officer, etc.
  email: text('email'),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export type Document = typeof documents.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Beneficiary = typeof beneficiaries.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type BoardMember = typeof boardMembers.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type CSROpportunity = typeof csrOpportunities.$inferSelect;
export type Proposal = typeof proposals.$inferSelect;

export const awards = pgTable('awards', {
  id: serial('id').primaryKey(),
  ngoId: integer('ngo_id').references(() => ngos.id).notNull(),
  title: text('title').notNull(),
  year: text('year').notNull(),
  description: text('description'),
  date: timestamp('date'), // Optional exact date
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Award = typeof awards.$inferSelect;
