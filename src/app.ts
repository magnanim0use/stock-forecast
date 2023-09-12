import fastify from 'fastify'
import { getPrediction } from './prediction'

type GetForecastQueryString = {
    stock: string,
    location?: string
}

type PostSlackCommandBody = {
    team_id: string
    team_domain: string
    command: string
    text: string
    response_url: string
}

const app = fastify()

app.register(require('@fastify/formbody'))

app.get<{ Querystring: GetForecastQueryString }>('/forecast', async (req, reply) => {
    const { stock, location } = req.query
    const forecast = await getPrediction(stock, location)
    reply.send({ data: forecast })
})

app.post<{ Body: PostSlackCommandBody }>('/slack/command', async (req, reply) => {
    const stock = req.body.text
    const forecast = await getPrediction(stock)

    reply.send({
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `The predicted closing values for stock ${stock} are`
                }
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `${forecast.date.slice(0, 9)} => $${Math.round(forecast.predictedStockValue * 100) / 100} USD`
                }
            }
        ]
    })
})

app.listen({ port: 8080 }, (err, address) => {
    if (err) throw err
    console.log(`Server is now listening on ${address}`)
})
