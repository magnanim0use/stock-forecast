import fastify from 'fastify'
import { getWeatherForecast, getWeatherHistory } from './weather'

type IQueryString = {
    stock: string,
    location?: string
}

const app = fastify()

app.get<{ Querystring: IQueryString }>('/forecast', async (req, reply) => {
    const { stock, location } = req.query
    const forecast = await getWeatherForecast(location)
    console.log(forecast)
    reply.send({ data: { forecast } })
})

app.listen({ port: 8080 }, (err, address) => {
    if (err) throw err
    console.log(`Server is now listening on ${address}`)
})

// (async () => getWeatherHistory('NYC'))()
