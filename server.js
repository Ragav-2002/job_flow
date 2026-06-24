const express = require('express');
const db = require('./db/dzle-pool');
const { sql } = require('drizzle-orm');
const userRouter = require('./routes/user-routes')
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

// routes
app.use('/api/v1/users', userRouter)

if(require.main === module){
    dbConnectionCheck()
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;