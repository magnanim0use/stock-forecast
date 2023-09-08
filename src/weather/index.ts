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
    if (process.env.DEMO_DB) {
        return demoData.days.filter((day: { temp: number }) => {
            return Math.round(day.temp) === Math.round(avgTemp)
        }).map((day: { datetime: string }) => day.datetime)
    }

    try {
        db.query(`
        SELECT date FROM weather
        WHERE avg_temp=${avgTemp}
    `)
    } catch (err) {
        console.log({ err })
    }
}
