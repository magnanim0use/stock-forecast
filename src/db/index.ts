import Pool from 'pg-pool'
require('dotenv').config()

const config = {
    database: process.env.PGDATABASE,
    host: 'localhost',
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
}

export const db = new Pool(config)
