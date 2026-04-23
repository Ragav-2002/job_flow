const { sql } = require("drizzle-orm");
const { pgTable, varchar, uuid, timestamp } = require("drizzle-orm/pg-core");
const users = require("./user");

const apis = pgTable("apis", {
    api_id: uuid("api_id").default(sql`gen_random_uuid()`).primaryKey(),
    api_key: varchar("api_key", { length: 255 }).unique().notNull(),
    user_id: uuid("user_id").notNull().references(() => users.user_id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
})

module.exports = apis