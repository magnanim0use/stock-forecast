const db = require('../dist/db')
const fs = require('node:fs')
const path = require('node:path')
require('dotenv').config()
const fastcsv = require('fast-csv')

const stream = fs.createReadStream(path.resolve(__dirname, '../data/weather_historical_data_NYC.csv'))
const csvData = []
const csvStream = fastcsv
    .parse()
    .on('data', function (data) {
        csvData.push(data);
    })
    .on('end', function () {
        // remove the first line: header
        csvData.shift();

        // connect to the PostgreSQL database
        // save csvData
    });

stream.pipe(csvStream);

// remove the first line: header
csvData.shift();

console.log(db)

const query =
    "INSERT INTO weather (id, date, location, avg_temp) VALUES ($1, $2, $3, $4)";

db.default.query(query)
