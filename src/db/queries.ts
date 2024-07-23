"use server";

import { eq, count, and, like } from 'drizzle-orm';
import { drawingsTable, eventsTable, InsertDrawing, InsertEvent, InsertUser, SelectUser, usersTable } from './schema';
import { db } from '.';

//====================User queries====================//
export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function getUserById(id: SelectUser['id']): Promise<Array<{ id: number, name: string, email: string, clerkId: string }>> {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function getUserIdByClerkId(clerkId: SelectUser['clerkId']): Promise<Array<{ id: number }>> {
  return await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.clerkId, clerkId));
}

export async function deleteUserByClerkId(clerkId: SelectUser['clerkId']) {
  const userId = (await getUserIdByClerkId(clerkId))[0].id;
  await db.delete(drawingsTable).where(eq(drawingsTable.userId, userId));
  await db.delete(usersTable).where(eq(usersTable.id, userId));
}

export async function getClerkIdGivenId(id: SelectUser['id']): Promise<Array<{ clerkId: string }>> {
  return await db.select({ clerkId: usersTable.clerkId }).from(usersTable).where(eq(usersTable.id, id));
}

//====================Drawing queries====================//
export async function createDrawing(data: InsertDrawing) {
  await db.insert(drawingsTable).values(data);
}

export async function getAllUserDrawingsPaginatedWithSearchTerm(userId: number, searchTerm: string, page: number, limit: number) {
  const actualPage = Math.max(page - 1, 0);
  return await db.select(
    {
      name: drawingsTable.name,
      payload: drawingsTable.payload,
      slug: drawingsTable.slug,
      isPublic: drawingsTable.isPublic,
    }
  ).from(drawingsTable)
    .where(and(eq(drawingsTable.userId, userId), like(drawingsTable.name, `%${searchTerm}%`)))
    .limit(limit).offset(actualPage * limit);
}

export async function getDrawingsCountWithSearchTerm(userId: number, searchTerm: string) {
  return await db.select({ count: count() }).from(drawingsTable)
    .where(and(eq(drawingsTable.userId, userId), like(drawingsTable.name, `%${searchTerm}%`)));
}

export async function getAllUserDrawingsPaginatedWithSearchTermPublicOnly(userId: number, searchTerm: string, page: number, limit: number) {
  const actualPage = Math.max(page - 1, 0);
  return await db.select(
    {
      name: drawingsTable.name,
      payload: drawingsTable.payload,
      slug: drawingsTable.slug,
      isPublic: drawingsTable.isPublic,
    }
  ).from(drawingsTable)
    .where(and(eq(drawingsTable.userId, userId), like(drawingsTable.name, `%${searchTerm}%`), eq(drawingsTable.isPublic, 1)))
    .limit(limit).offset(actualPage * limit);
}

export async function getDrawingsCountWithSearchTermPublicOnly(userId: number, searchTerm: string) {
  return await db.select({ count: count() }).from(drawingsTable)
    .where(and(eq(drawingsTable.userId, userId), like(drawingsTable.name, `%${searchTerm}%`), eq(drawingsTable.isPublic, 1)));
}


export async function togglePublicDrawing(slug: string) {
  const drawing = await db.select().from(drawingsTable).where(eq(drawingsTable.slug, slug));
  await await db.update(drawingsTable).set({ isPublic: drawing[0].isPublic === 1 ? 0 : 1 }).where(eq(drawingsTable.slug, slug));
}

export async function getDrawingBySlug(slug: string) {
  return await db.select(
    {
      name: drawingsTable.name,
      payload: drawingsTable.payload,
      isPublic: drawingsTable.isPublic,
      description: drawingsTable.description,
      userId: drawingsTable.userId,
    }
  ).from(drawingsTable).where(eq(drawingsTable.slug, slug));
}

export async function deleteDrawing(slug: string) {
  await await db.delete(drawingsTable).where(eq(drawingsTable.slug, slug));
}

export async function updateDrawingPayload(slug: string, payload: string) {
  await db.update(drawingsTable).set({ payload }).where(eq(drawingsTable.slug, slug));
}

export async function updateDrawingInfo(slug: string, name: string, description: string, isPublic: boolean) {
  await db.update(drawingsTable).set({ name, description, isPublic: isPublic ? 1 : 0 }).where(eq(drawingsTable.slug, slug));
}

export async function getAllPublicDrawingsSlugs() {
  return await db.select({ slug: drawingsTable.slug }).from(drawingsTable).where(eq(drawingsTable.isPublic, 1));
}

//====================Events queries====================//
export async function createEvent(payload: InsertEvent) {
  await db.insert(eventsTable).values(payload);
}
