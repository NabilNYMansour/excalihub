const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const { integer, sqliteTable, text } = require('drizzle-orm/sqlite-core');

console.log("seed> Creating db connection");
const betterSqlite = new Database('.sqlite.db');
const db = drizzle(betterSqlite);

const NEW_DRAWING = {"elements":[{"id":"gudG2BE25zfp57R7XXKfA","type":"text","x":813,"y":385,"width":215.02809143066406,"height":45,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":2009499878,"version":93,"versionNonce":1038612262,"isDeleted":false,"boundElements":null,"updated":1720881617151,"link":null,"locked":false,"text":"New Drawing","fontSize":36,"fontFamily":1,"textAlign":"center","verticalAlign":"top","baseline":32,"containerId":null,"originalText":"New Drawing","lineHeight":1.25}]}

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
  for (let i = 1; i <= 100; i++) {
    createDrawing({
      userId: 1,
      name: "Drawing" + i,
      description: "Description for Drawing" + i,
      isPublic: i % 2 === 0 ? 1 : 0,
      createAt: new Date().toISOString(),
      payload: JSON.stringify(NEW_DRAWING),
      slug: crypto.randomUUID().replace(/-/g, '')
    });
  }
}

console.log("seed> Seeding");
seedDrawings();
console.log("seed> Seeding complete");
