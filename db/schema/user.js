const { sql } = require("drizzle-orm");
const { pgTable, uuid, text, varchar, timestamp } = require("drizzle-orm/pg-core");

const users = pgTable("users", {
  user_id: uuid("user_id").default(sql`gen_random_uuid()`).primaryKey(),
  username: text("username").notNull(),
  email: varchar("email", { length: 150 }).unique().notNull(),
  password: text("password", {length: 150}).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull()
});

module.exports = users