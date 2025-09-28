import * as db from "@/db/queries";

export async function fetchAllPublicDrawings() {
  try {
    return await db.getAllPublicDrawingsSlugs();
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
}
