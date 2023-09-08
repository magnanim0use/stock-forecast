require('dotenv').config()
const fastifyPostgres = require('@fastify/postgres')
const { db } = require('../dist/db')
const fastcsv = require('fast-csv')
const fastify = require('fastify')()
const fs = require('node:fs')
const path = require('node:path')
const dbClient = new db.Client()

const parseCsv = (path) => {
    return new Promise((res, rej) => {
        const csvData = []
        const stream = fs.createReadStream(path)
        const csvStream = fastcsv
            .parse()
            .on('data', function (data) {
                csvData.push(data)
            })
            .on('end', function () {
                return res(csvData.map(d => ({
                    location: d[0],
                    date: d[1],
                    avgTemp: d[4]
                })))
            });

        stream.pipe(csvStream)
    })
}

const insertToDb = async (data) => {
    return Promise.all(data.map(d => dbClient.query(`INSERT INTO weather (date, location, avg_temp) VALUES (${d.date}, ${d.location}, ${d.avgTemp})`)))
}

(async () => {
    const csvData = await parseCsv(path.resolve(__dirname, '../data/nyc_historical_weather_data.csv'))
    await insertToDb(csvData)
})()
