const {pgTable, uuid, pgEnum, integer, jsonb, timestamp} = require("drizzle-orm/pg-core")
const {sql} = require("drizzle-orm")

const jobStatus = pgEnum("job_status", ["pending", "in_progress", "completed", "failed"])

const jobs = pgTable("jobs", {
    job_id : uuid("job_id").default(sql`gen_random_uuid()`).primaryKey(),
    payload: jsonb("payload").notNull(),
    status: jobStatus("status").default("pending").notNull(),
    priority: integer("priority").default(0).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
})

module.exports = {jobStatus, jobs}