"use server";

import * as db from "@/db/queries";
import * as schemaDB from "@/db/schema";
import { createInsertSchema } from 'drizzle-zod';

const drawingSchema = createInsertSchema(schemaDB.drawingsTable);

export async function createDrawingAction(formData: FormData) {
  try {
    const clerkId = formData.get('clerkId') as string;
    const userId = (await db.getUserIdByClerkId(clerkId))[0].id;
    const name = (formData.get('title') as string).trim();
    const description = formData.get('description') as string;
    const isPublic = formData.get('isPublic') ? 1 : 0;
    const slug = crypto.randomUUID().replace(/-/g, '');
    const date = new Date().toISOString();

    drawingSchema.parse({
      userId,
      name,
      description,
      isPublic,
      createAt: date,
      payload: '',
      slug
    });

    db.createDrawing({
      userId,
      name,
      description,
      isPublic,
      createAt: date,
      payload: '',
      slug
    });

    return slug;
  } catch (error) {
    console.error("Error creating drawing at", new Date().toISOString());
    console.error(error);
    return "";
  }
}

export async function togglePublicDrawingAction(slug: string) {
  try {
    await db.togglePublicDrawing(slug);
    return true;
  } catch (error) {
    console.error("Error toggling public drawing at", new Date().toISOString());
    console.error(error);
    return false;
  }
}

export async function deleteDrawingAction(slug: string) {
  try {
    await db.deleteDrawing(slug);
    return true;
  } catch (error) {
    console.error("Error deleting drawing at", new Date().toISOString());
    console.error(error);
    return false;
  }
}