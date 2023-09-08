require('dotenv').config()
import Pool from 'pg-pool'

const db = new Pool({
    database: 'housing_cloud_demo',
    user: 'housing_cloud_demo_user',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

export default db
