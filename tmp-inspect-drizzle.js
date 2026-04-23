const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://postgres:1234@localhost:5432/jobflow' });
const db = drizzle(pool, { schema: {} });
console.log(Object.keys(db).sort());
pool.end();
