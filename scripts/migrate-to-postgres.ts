import { config } from 'dotenv';

config({ path: '.env.local' });

console.log("migrate> Creating SQLite connection");
import { drizzle as SQLITEdrizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
const sqlite = SQLITEdrizzle(new Database('.sqlite.db'));

console.log("migrate> Creating Postgres connection");
import { neon } from '@neondatabase/serverless';
const postgresSql = neon(process.env.DATABASE_URL!);

console.log("migrate> Defining SQLITE schemas");
import { integer as sqliteInteger, sqliteTable, text as sqliteText } from 'drizzle-orm/sqlite-core';
const SQLITEusersTable = sqliteTable('users', {
  id: sqliteInteger('id').primaryKey(),
  name: sqliteText('name').notNull(),
  email: sqliteText('email').notNull(),
  clerkId: sqliteText('clerkId').unique().notNull(),
  createAt: sqliteText('created_at').notNull(),
});

const SQLITEdrawingsTable = sqliteTable('drawings', {
  id: sqliteInteger('id').primaryKey(),
  userId: sqliteInteger('userId').notNull().references(() => SQLITEusersTable.id),
  name: sqliteText('name').notNull(),
  description: sqliteText('description').notNull(),
  isPublic: sqliteInteger('is_public').notNull(),
  slug: sqliteText('slug').unique().notNull(),
  createAt: sqliteText('created_at').notNull(),
  payload: sqliteText('payload').notNull(),
});

const SQLITEeventsTable = sqliteTable('events', {
  eventId: sqliteInteger('event_id').primaryKey(),
  payload: sqliteText('payload').notNull(),
  createAt: sqliteText('created_at').notNull(),
});

function insertUserTable(id: number, name: string, email: string, clerkId: string, createAt: string) {
  return postgresSql`
    INSERT INTO users (id, name, email, "clerkId", created_at) 
    VALUES (${id}, ${name}, ${email}, ${clerkId}, ${createAt})
 `;
}
function deleteAllUsers() {
  return postgresSql`
    DELETE FROM users
 `;
}

function insertDrawingTable(id: number, userId: number, name: string, description: string, isPublic: number, slug: string, createAt: string, payload: string) {
  return postgresSql`
    INSERT INTO drawings (id, "userId", name, description, is_public, slug, created_at, payload) 
    VALUES (${id}, ${userId}, ${name}, ${description}, ${isPublic}, ${slug}, ${createAt}, ${payload})
 `;
}
function deleteAllDrawings() {
  return postgresSql`
    DELETE FROM drawings
 `;
}

function insertEventTable(eventId: number, payload: string, createAt: string) {
  return postgresSql`
    INSERT INTO events (event_id, payload, created_at) 
    VALUES (${eventId}, ${payload}, ${createAt})
 `;
}
function deleteAllEvents() {
  return postgresSql`
    DELETE FROM events
 `;
}

async function clearAllTables() {
  console.log("migrate> Clearing all tables");
  await deleteAllDrawings().then(async () => await deleteAllUsers());
  await deleteAllEvents();
  console.log("migrate> All tables cleared");
}

async function migrateUserTable() {
  const rows = await sqlite.select().from(SQLITEusersTable).all();
  console.log(`migrate> Migrating users table with ${rows.length} rows`);
  await Promise.all(rows.map(row => insertUserTable(row.id, row.name, row.email, row.clerkId, row.createAt)));
  console.log("migrate> Users table migration done");
}

async function migrateDrawingsTable() {
  const rows = await sqlite.select().from(SQLITEdrawingsTable).all();
  console.log(`migrate> Migrating drawings table with ${rows.length} rows`);
  await Promise.all(rows.map(row => insertDrawingTable(row.id, row.userId, row.name, row.description, row.isPublic, row.slug, row.createAt, row.payload)));
  console.log("migrate> Drawings table migration done");
}

async function migrateEventsTable() {
  const rows = await sqlite.select().from(SQLITEeventsTable).all();
  console.log(`migrate> Migrating events table with ${rows.length} rows`);
  await Promise.all(rows.map(row => insertEventTable(row.eventId, row.payload, row.createAt)));
  console.log("migrate> Events table migration done");
}

async function resetSequences() {
  console.log("migrate> Resetting sequences");
  await postgresSql`SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users))`;
  await postgresSql`SELECT setval(pg_get_serial_sequence('drawings', 'id'), (SELECT MAX(id) FROM drawings))`;
  await postgresSql`SELECT setval(pg_get_serial_sequence('events', 'event_id'), (SELECT MAX(event_id) FROM events))`;
  console.log("migrate> Sequences reset");
}

clearAllTables().then(async () => {
  await migrateUserTable().then(async () => await migrateDrawingsTable());
  await migrateEventsTable();
}).then(async () => await resetSequences());


