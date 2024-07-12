import { eq } from 'drizzle-orm';
import { drawingsTable, eventsTable, InsertDrawing, InsertEvent, InsertUser, SelectUser, usersTable } from './schema';
import { db } from '.';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserById(id: SelectUser['id']): Promise<Array<{ id: number, name: string, email: string, clerkId: string }>> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function deleteUserByClerkId(clerkId: SelectUser['clerkId']) {
  await db.delete(usersTable).where(eq(usersTable.clerkId, clerkId));
}

export async function createDrawing(data: InsertDrawing) {
  await db.insert(drawingsTable).values(data);
}

export async function createEvent(payload: InsertEvent) {
  await db.insert(eventsTable).values(payload);
}
