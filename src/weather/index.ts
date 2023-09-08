import { db } from '../db'
const demoData = require('../../data/nyc_historical_weather_data.json')
require('dotenv').config()

export async function getWeatherForecast(location: string) {
    const params = new URLSearchParams({
        location,
        timesteps: '1d',
        units: 'metric',
        apikey: process.env.WEATHER_API_KEY,
    })

    const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?${params.toString()}`)
    const data = await response.json()

    return data.timelines.daily.map((daily: { time: string, values: { temperatureAvg: number } }) => ({
        date: daily.time,
        avgTemp: daily.values.temperatureAvg
    }))
}

export async function getMatchingWeatherDates(avgTemp: number) {
    const dbClient = await db.connect()
    const dates = await dbClient.query(`
        SELECT date FROM weather
        WHERE avg_temp=${Math.round(avgTemp)}
    `)

    console.log({ dates })
    return dates.rows
}
