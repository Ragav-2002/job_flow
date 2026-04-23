require('dotenv').config()
const {Pool} = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.on('error', (error)=>{
    console.error('Unexpected error on idle client', error)
    process.exit(-1)
})

module.exports = pool