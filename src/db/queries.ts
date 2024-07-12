import { eq } from 'drizzle-orm';
import { drawingsTable, eventsTable, InsertDrawing, InsertEvent, InsertUser, SelectUser, usersTable } from './schema';
import { db } from '.';

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserById(id: SelectUser['id']): Promise<Array<{ id: number, name: string, email: string, clerkId: string }>> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function getUserIdByClerkId(clerkId: SelectUser['clerkId']): Promise<Array<{ id: number }>> {
  return db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.clerkId, clerkId));
}

export async function deleteUserByClerkId(clerkId: SelectUser['clerkId']) {
  await db.delete(usersTable).where(eq(usersTable.clerkId, clerkId));
}

export async function createDrawing(data: InsertDrawing) {
  await db.insert(drawingsTable).values(data);
}

export async function getAllUserDrawingsPaginatedGivenClerkId(clerkId: string, page: number, limit: number) {
  const userId = (await getUserIdByClerkId(clerkId))[0].id;
  return db.select(
    {
      name: drawingsTable.name,
      payload: drawingsTable.payload,
      slug: drawingsTable.slug,
    }
  ).from(drawingsTable).where(eq(drawingsTable.userId, userId)).limit(limit).offset(page * limit);
}

export async function createEvent(payload: InsertEvent) {
  await db.insert(eventsTable).values(payload);
}