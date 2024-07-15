"use server";

import * as db from "@/db/queries";
import * as schemaDB from "@/db/schema";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const NEW_DRAWING = { "elements": [{ "id": "gudG2BE25zfp57R7XXKfA", "type": "text", "x": 813, "y": 385, "width": 215.02809143066406, "height": 45, "angle": 0, "strokeColor": "#1e1e1e", "backgroundColor": "transparent", "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid", "roughness": 1, "opacity": 100, "groupIds": [], "frameId": null, "roundness": null, "seed": 2009499878, "version": 93, "versionNonce": 1038612262, "isDeleted": false, "boundElements": null, "updated": 1720881617151, "link": null, "locked": false, "text": "New Drawing", "fontSize": 36, "fontFamily": 1, "textAlign": "center", "verticalAlign": "top", "baseline": 32, "containerId": null, "originalText": "New Drawing", "lineHeight": 1.25 }] }
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

    // no auth is required past this point

    drawingSchema.parse({
      userId,
      name,
      description,
      isPublic,
      createAt: date,
      payload: '',
      slug
    });


    await db.createDrawing({
      userId,
      name,
      description,
      isPublic,
      createAt: date,
      payload: JSON.stringify(NEW_DRAWING),
      slug
    });

    return slug;
  } catch (error) {
    console.error("Error creating drawing at", new Date().toISOString());
    console.error(error);
    return "";
  }
}

const isAuthorized = async (slug: string, clerkId: string) => {
  const userId = (await db.getUserIdByClerkId(clerkId))[0].id;
  const drawing = await db.getDrawingBySlug(slug);
  return userId === drawing[0].userId;
}
const updateDrawingSchema = z.object({
  slug: z.string(),
  payload: z.string()
});
export const saveDrawingAction = async (formData: FormData, slug: string, payload: string) => {
  try {
    if (!await isAuthorized(slug, formData.get('clerkId') as string)) {
      console.error("Unauthorized access to save drawing at", new Date().toISOString());
      return false;
    }
    updateDrawingSchema.parse({ slug, payload });
    await db.updateDrawingPayload(slug, payload);
  } catch (error) {
    console.error("Error checking authorization to save drawing at", new Date().toISOString());
    console.error(error);
    return false;
  }
  return true;
}

const slugScheme = z.object({
  slug: z.string()
});
export async function togglePublicDrawingAction(formData: FormData, slug: string) {
  try {
    if (!await isAuthorized(slug, formData.get('clerkId') as string)) {
      console.error("Unauthorized access to save drawing at", new Date().toISOString());
      return false;
    }
    slugScheme.parse({ slug });
    await db.togglePublicDrawing(slug);
    return true;
  } catch (error) {
    console.error("Error toggling public drawing at", new Date().toISOString());
    console.error(error);
    return false;
  }
}
export async function deleteDrawingAction(formData: FormData, slug: string) {
  try {
    console.log(formData.get('clerkId') as string);
    if (!await isAuthorized(slug, formData.get('clerkId') as string)) {
      
      console.error("Unauthorized access to save drawing at", new Date().toISOString());
      return false;
    }
    slugScheme.parse({ slug });
    await db.deleteDrawing(slug);
    return true;
  } catch (error) {
    console.error("Error deleting drawing at", new Date().toISOString());
    console.error(error);
    return false;
  }
}

const nameChangeSchema = z.object({
  slug: z.string(),
  name: z.string()
});
export async function updateDrawingNameAction(formData: FormData, slug: string, name: string) {
  try {
    if (!await isAuthorized(slug, formData.get('clerkId') as string)) {
      console.error("Unauthorized access to save drawing at", new Date().toISOString());
      return false;
    }
    nameChangeSchema.parse({ slug, name });
    await db.updateDrawingName(slug, name);
    return true;
  } catch (error) {
    console.error("Error updating drawing name at", new Date().toISOString());
    console.error(error);
    return false;
  }
}