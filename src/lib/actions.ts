"use server";

import * as db from "@/db/queries";
import * as checks from "./checks";
import { APP_DESCRIPTION, NEW_DRAWING } from "./constants";

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

    checks.drawingSchema.parse({
      userId,
      name,
      description,
      isPublic,
      createAt: date,
      payload: '',
      slug
    });

    checks.stringsInDrawingSchema.parse({ name, description });

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

export async function forkDrawingAction(formData: FormData, slug: string) {
  try {
    const drawing = await db.getDrawingBySlug(slug);
    if (drawing[0].isPublic !== 1) {
      console.error("Unauthorized access to fork drawing at", new Date().toISOString());
      return "";
    }
    const clerkId = formData.get('clerkId') as string;
    const userId = (await db.getUserIdByClerkId(clerkId))[0].id;
    const name = drawing[0].name;
    const description = drawing[0].description;
    const isPublic = 1;
    const createAt = new Date().toISOString();
    const payload = formData.get('payload') as string;
    const newSlug = crypto.randomUUID().replace(/-/g, '');

    checks.drawingSchema.parse({
      userId,
      name,
      description,
      isPublic,
      createAt,
      payload,
      slug: newSlug
    });

    checks.stringsInDrawingSchema.parse({ name, description });

    await db.createDrawing({
      userId,
      name,
      description,
      isPublic,
      createAt,
      payload,
      slug: newSlug
    });

    return newSlug;
  } catch (error) {
    console.error("Error forking drawing at", new Date().toISOString());
    console.error(error);
    return "";
  }
}

export async function forkWelcomeDrawingAction(formData: FormData) {
  try {
    const clerkId = formData.get('clerkId') as string;
    const userId = (await db.getUserIdByClerkId(clerkId))[0].id;
    const name = "Welcome to ExcaliHub";
    const description = APP_DESCRIPTION;
    const isPublic = 1;
    const createAt = new Date().toISOString();
    const payload = formData.get('payload') as string;
    const newSlug = crypto.randomUUID().replace(/-/g, '');

    checks.drawingSchema.parse({
      userId,
      name,
      description,
      isPublic,
      createAt,
      payload,
      slug: newSlug
    });

    // No need to check strings in drawing schema as they are hardcoded
    // checks.stringsInDrawingSchema.parse({ name, description });

    await db.createDrawing({
      userId,
      name,
      description,
      isPublic,
      createAt,
      payload,
      slug: newSlug
    });

    return newSlug;
  } catch (error) {
    console.error("Error forking welcome drawing at", new Date().toISOString());
    console.error(error);
    return "";
  }
}

export const saveDrawingAction = async (formData: FormData, slug: string, payload: string) => {
  try {
    if (!await checks.isAuthorized(slug, formData.get('clerkId') as string)) {
      console.error("Unauthorized access to save drawing at", new Date().toISOString());
      return false;
    }
    checks.updateDrawingSchema.parse({ slug, payload });
    await db.updateDrawingPayload(slug, payload);
  } catch (error) {
    console.error("Error checking authorization to save drawing at", new Date().toISOString());
    console.error(error);
    return false;
  }
  return true;
}

export async function togglePublicDrawingAction(formData: FormData, slug: string) {
  try {
    if (!await checks.isAuthorized(slug, formData.get('clerkId') as string)) {
      console.error("Unauthorized access to save drawing at", new Date().toISOString());
      return false;
    }
    checks.slugScheme.parse({ slug });
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
    if (!await checks.isAuthorized(slug, formData.get('clerkId') as string)) {
      console.error("Unauthorized access to save drawing at", new Date().toISOString());
      return false;
    }
    checks.slugScheme.parse({ slug });
    await db.deleteDrawing(slug);
    return true;
  } catch (error) {
    console.error("Error deleting drawing at", new Date().toISOString());
    console.error(error);
    return false;
  }
}

export async function updateDrawingInfoAction(formData: FormData, slug: string, name: string, description: string, isPublic: boolean) {
  try {
    if (!await checks.isAuthorized(slug, formData.get('clerkId') as string)) {
      console.error("Unauthorized access to save drawing at", new Date().toISOString());
      return false;
    }
    checks.updateDrawingInfoSchema.parse({ slug, name, description, isPublic });
    checks.stringsInDrawingSchema.parse({ name, description });
    await db.updateDrawingInfo(slug, name, description, isPublic);
    return true;
  } catch (error) {
    console.error("Error updating drawing info at", new Date().toISOString());
    console.error(error);
    return false;
  }
}
