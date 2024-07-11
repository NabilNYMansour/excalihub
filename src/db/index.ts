import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const betterSqlite = new Database('.sqlite.db');
export const db: BetterSQLite3Database = drizzle(betterSqlite);