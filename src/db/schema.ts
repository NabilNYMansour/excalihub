import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  clerkId: text('clerkId').unique().notNull(),
  createAt: text('created_at').notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const drawingsTable = sqliteTable('drawings', {
  id: integer('id').primaryKey(),
  userId: integer('userId').notNull().references(() => usersTable.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  isPublic: integer('is_public').notNull(),
  slug: text('slug').unique().notNull(),
  createAt: text('created_at').notNull(),
  payload: text('payload').notNull(),
});

export type InsertDrawing = typeof drawingsTable.$inferInsert;
export type SelectDrawing = typeof drawingsTable.$inferSelect;

export const eventsTable = sqliteTable('events', {
  eventId: integer('event_id').primaryKey(),
  payload: text('payload').notNull(),
  createAt: text('created_at').notNull(),
});

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;
