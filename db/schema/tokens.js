const { sql } = require('drizzle-orm')
const {pgTable, uuid, text, timestamp, boolean, varchar} = require('drizzle-orm/pg-core')
const users = require('./user')

const tokens = pgTable("tokens", {
    token_id: uuid("token_id").default(sql`gen_random_uuid()`).primaryKey(),
    user_id: uuid("user_id").notNull().references(()=>users.user_id,{
        onDelete: 'cascade'
    }),
    token_hash: text("token_hash").notNull().unique(),
    device: varchar("device", {length: 255}),
    revoked: boolean("revoked").notNull().default(false),
    created_at: timestamp("created_at").defaultNow(),
    expires_at: timestamp("expires_at").notNull()
})

module.exports = tokens