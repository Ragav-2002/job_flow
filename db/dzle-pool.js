const { drizzle } = require("drizzle-orm/node-postgres");
const pool = require("./pg-pool");
const schema = require("./schema");

const db = drizzle(pool, { schema });

module.exports = db;