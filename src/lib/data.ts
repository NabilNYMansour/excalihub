import * as db from "@/db/queries";

export async function fetchAllPublicDrawings() {
  try {
    return await db.getAllPublicDrawingsSlugs();
  } catch (error) {
    console.error("Error fetching all public drawings at", new Date().toISOString());
    console.error(error);
    return [];
  }
}
