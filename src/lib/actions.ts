"use server";

import * as db from "@/db/queries";
import * as schemaDB from "@/db/schema";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// TODO: Check for authorization

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

const slugScheme = z.object({
  slug: z.string()
});
export async function togglePublicDrawingAction(slug: string) {
  try {
    slugScheme.parse({ slug });
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
    slugScheme.parse({ slug });
    await db.deleteDrawing(slug);
    return true;
  } catch (error) {
    console.error("Error deleting drawing at", new Date().toISOString());
    console.error(error);
    return false;
  }
}
