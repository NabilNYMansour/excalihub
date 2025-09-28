import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  clerkId: varchar('clerkId').unique().notNull(),
  createAt: varchar('created_at').notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const drawingsTable = pgTable('drawings', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  userId: integer('userId').notNull().references(() => usersTable.id),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  isPublic: integer('is_public').notNull(),
  slug: varchar('slug').unique().notNull(),
  createAt: varchar('created_at').notNull(),
  payload: varchar('payload').notNull(),
});

export type InsertDrawing = typeof drawingsTable.$inferInsert;
export type SelectDrawing = typeof drawingsTable.$inferSelect;

export const eventsTable = pgTable('events', {
  eventId: integer('event_id').primaryKey().generatedByDefaultAsIdentity(),
  payload: varchar('payload').notNull(),
  createAt: varchar('created_at').notNull(),
});

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;
