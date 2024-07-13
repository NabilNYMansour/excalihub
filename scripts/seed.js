const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const { integer, sqliteTable, text } = require('drizzle-orm/sqlite-core');

console.log("seed> Creating db connection");
const betterSqlite = new Database('.sqlite.db');
const db = drizzle(betterSqlite);

console.log("seed> Defining table and seed functions");
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

async function createDrawing(data) {
  await db.insert(drawingsTable).values(data);
}

// Will assume that you have made a user with userId=1
const seedDrawings = () => {
  for (let i = 1; i <= 10; i++) {
    createDrawing({
      userId: 1,
      name: "Drawing" + i,
      description: "Description for Drawing" + i,
      isPublic: i % 2 === 0 ? 1 : 0,
      createAt: new Date().toISOString(),
      payload: "",
      slug: "drawing-" + i
    });
  }
}

console.log("seed> Seeding");
seedDrawings();
console.log("seed> Seeding complete");
