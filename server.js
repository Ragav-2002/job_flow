const express = require('express');
const db = require('./db/dzle-pool');
const { sql } = require('drizzle-orm');
const app = express();

app.use(express.json());

async function dbConnectionCheck(){
    try{
        const result = await db.execute(sql`SELECT NOW()`);
        console.log('Database connected successfully at', result.rows[0].now);
    }catch(err){
        console.error('Error connecting to the database', err);
        process.exit(1);
    }
}

dbConnectionCheck()

// Sample route
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});