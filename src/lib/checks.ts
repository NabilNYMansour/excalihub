import * as schemaDB from "@/db/schema";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import * as db from "@/db/queries";

export const drawingSchema = createInsertSchema(schemaDB.drawingsTable);

export const stringsInDrawingSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(0).max(500),
});

export const updateDrawingSchema = z.object({
  slug: z.string(),
  payload: z.string()
});

export const slugScheme = z.object({
  slug: z.string()
});

export const updateDrawingInfoSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  isPublic: z.boolean()
});

export const isAuthorized = async (slug: string, clerkId: string) => {
  const userId = (await db.getUserIdByClerkId(clerkId))[0].id;
  const drawing = await db.getDrawingBySlug(slug);
  return userId === drawing[0].userId;
}
