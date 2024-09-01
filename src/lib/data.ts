import * as db from "@/db/queries";
import { logger } from "@/logger";

export async function fetchAllPublicDrawings() {
  try {
    return await db.getAllPublicDrawingsSlugs();
  } catch (error: any) {
    logger.error(error.message);
    return [];
  }
}
