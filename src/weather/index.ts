require('dotenv').config();

export async function getWeatherForecast(location: string) {
    const params = new URLSearchParams({
        location,
        timesteps: '1d',
        units: 'metric',
        apikey: process.env.WEATHER_API_KEY,
    })

    const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?${params.toString()}`)
    const data = await response.json()
    return data.timelines.daily.map((daily: { values: { temperatureAvg: number } }) => daily.values.temperatureAvg)
}

export async function getWeatherHistory(location: string) {
    const response = await fetch(
        `https://api.tomorrow.io/v4/historical?apikey=${process.env.WEATHER_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Accept-Encoding': 'gzip' },
            body: JSON.stringify({
                location,
                fields: [
                    "temperature"
                ],
                timesteps: [
                    "1d"
                ],
                startTime: "2023-09-00T00:00:00Z",
                endTime: "2023-09-05T00:00:00Z",
                units: "metric"
            })
        }
    )

    const data = await response.json()
    console.log(data)
}
