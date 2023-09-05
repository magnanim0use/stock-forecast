import fastify from 'fastify'
import { getPrediction } from './prediction'

type GetForecastQueryString = {
    stock: string,
    location?: string
}

const app = fastify()

app.get<{ Querystring: GetForecastQueryString }>('/forecast', async (req, reply) => {
    const { stock, location } = req.query
    const forecast = await getPrediction(stock, location)
    reply.send({ data: { forecast } })
})

app.listen({ port: 8080 }, (err, address) => {
    if (err) throw err
    console.log(`Server is now listening on ${address}`)
})

