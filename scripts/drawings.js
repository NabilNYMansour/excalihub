const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const { integer, sqliteTable, text } = require('drizzle-orm/sqlite-core');
const { eq } = require('drizzle-orm');

console.log("drawings> Creating db connection");
const betterSqlite = new Database('.sqlite.db');
const db = drizzle(betterSqlite);

console.log("drawings> Defining tables and functions");
const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  clerkId: text('clerkId').unique().notNull(),
  createAt: text('created_at').notNull(),
});

const drawingsTable = sqliteTable('drawings', {
  id: integer('id').primaryKey(),
  userId: integer('userId').notNull().references(() => usersTable.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  isPublic: integer('is_public').notNull(),
  slug: text('slug').unique().notNull(),
  createAt: text('created_at').notNull(),
  payload: text('payload').notNull(),
});

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('No command-line arguments provided');
    console.log('Available commands:');
    console.log('- show-all-drawings: Show all drawings');
    console.log('- show-all-drawings-user <userId>: Show all drawings for a specific user');
    console.log('- show-drawing-payload <slug>: Show the payload of a drawing');
    console.log('- delete-drawing <slug>: Delete a drawing');
    process.exit(0);
  }

  switch (args[0]) {
    case 'show-all-drawings':
      console.log('Showing all drawings');
      const drawings = await db.select(
        {
          slug: drawingsTable.slug,
          isPublic: drawingsTable.isPublic,
          name: drawingsTable.name,
        }
      ).from(drawingsTable);
      drawings.forEach(drawing => {
        console.log(drawing);
      });
      break;

    case 'show-all-drawings-user':
      console.log('Showing all user drawings');
      const userId = args[1];
      const drawingsUser = await db.select(
        {
          slug: drawingsTable.slug,
          isPublic: drawingsTable.isPublic,
          name: drawingsTable.name,
        }
      ).from(drawingsTable).where(eq(drawingsTable.userId, userId));
      drawingsUser.forEach(drawing => {
        console.log(drawing);
      });
      break;

    case 'show-drawing-payload':
      console.log('Showing drawing payload');
      if (args.length < 2) {
        console.log('Please provide a slug to show payload');
        process.exit(1);
      }

      const drawingSlug = args[1];
      const drawingPayload = await db.select(
        {
          payload: drawingsTable.payload,
        }
      ).from(drawingsTable).where(eq(drawingsTable.slug, drawingSlug));
      drawingPayload.forEach(drawing => {
        console.log(drawing);
      });
      break;

    case 'delete-drawing':
      if (args.length < 2) {
        console.log('Please provide a slug to delete a drawing');
        process.exit(1);
      }

      const slug = args[1];
      console.log(`Deleting drawing with slug: ${slug}`);
      const result = await db.delete(drawingsTable).where(eq(drawingsTable.slug, slug));
      console.log(result);
      break; 
  }
}

main();