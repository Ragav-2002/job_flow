require("dotenv").config();
module.exports = {
  schema: "./db/schema/index.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};