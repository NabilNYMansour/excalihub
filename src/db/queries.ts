import { eq, count } from 'drizzle-orm';
import { drawingsTable, eventsTable, InsertDrawing, InsertEvent, InsertUser, SelectUser, usersTable } from './schema';
import { db } from '.';

//====================User queries====================//
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

//====================Drawing queries====================//
export async function createDrawing(data: InsertDrawing) {
  await db.insert(drawingsTable).values(data);
}

export async function getAllUserDrawingsPaginatedGivenClerkId(clerkId: string, page: number, limit: number) {
  const actualPage = Math.max(page - 1, 0);
  const userId = (await getUserIdByClerkId(clerkId))[0].id;
  return db.select(
    {
      name: drawingsTable.name,
      payload: drawingsTable.payload,
      slug: drawingsTable.slug,
      isPublic: drawingsTable.isPublic,
    }
  ).from(drawingsTable).where(eq(drawingsTable.userId, userId)).limit(limit).offset(actualPage * limit);
}

export async function togglePublicDrawing(slug: string) {
  const drawing = await db.select().from(drawingsTable).where(eq(drawingsTable.slug, slug));
  await db.update(drawingsTable).set({ isPublic: drawing[0].isPublic === 0 ? 1 : 0 }).where(eq(drawingsTable.slug, slug));
}

export async function getDrawingBySlug(slug: string) {
  return db.select(
    {
      name: drawingsTable.name,
      payload: drawingsTable.payload,
      slug: drawingsTable.slug,
      isPublic: drawingsTable.isPublic,
      userId: drawingsTable.userId,
    }
  ).from(drawingsTable).where(eq(drawingsTable.slug, slug));
}

export async function getDrawingsCountGivenClerkId(clerkId: string) {
  const userId = (await getUserIdByClerkId(clerkId))[0].id;
  return db.select({ count: count() }).from(drawingsTable).where(eq(drawingsTable.userId, userId));
}

export async function deleteDrawing(slug: string) {
  await db.delete(drawingsTable).where(eq(drawingsTable.slug, slug));
}

//====================Events queries====================//
export async function createEvent(payload: InsertEvent) {
  await db.insert(eventsTable).values(payload);
}
