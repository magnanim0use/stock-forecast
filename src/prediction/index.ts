import { getCurrentStockValue, getHistoricalStockValues } from '../stocks';
import { getWeatherForecast } from '../weather';

export async function getPrediction(stock: string, location?: string) {
    const stockValue = await getCurrentStockValue('AAPL')
    const weatherForecast = await getWeatherForecast('NYC')
    const historicalStockValues = await getHistoricalStockValues('AAPL', [
        '2023-08-05T10:00:00Z',
        '2023-08-06T10:00:00Z',
        '2023-08-07T10:00:00Z',
        '2023-08-08T10:00:00Z',
        '2023-08-09T10:00:00Z'
    ])

    const averageDailyStockValueChange = historicalStockValues
        .map(values => (values.close - values.open) / values.open)
        .reduce((a, b) => (a + b) / historicalStockValues.length)

    const predictedStockValue = stockValue + averageDailyStockValueChange

    return { data: { value: predictedStockValue } }
}