import { getCurrentStockValue, getHistoricalStockValues } from '../stocks';
import { getWeatherForecast, getMatchingWeatherDates } from '../weather';

export async function getPrediction(stock: string, location?: string) {
    const currentStockValue = await getCurrentStockValue('AAPL')
    const weatherForecast = await getWeatherForecast('NYC')
    const matchingWeatherDates = await getMatchingWeatherDates(weatherForecast[0].average)
    //TODO: get dates with same weather in db
    const historicalStockValues = await getHistoricalStockValues('AAPL', [
        //Hardcoded for now
        '2023-08-05T10:00:00Z',
        '2023-08-06T10:00:00Z',
        '2023-08-07T10:00:00Z',
        '2023-08-08T10:00:00Z',
        '2023-08-09T10:00:00Z'
    ])

    /* Find average daily change of stock at particular dates */
    const averageChange = historicalStockValues
        .map(value => (value.close - value.open) / value.open)
        .reduce((a, b) => (a + b) / historicalStockValues.length)

    const predictedStockValue = currentStockValue + (averageChange * currentStockValue)

    return predictedStockValue
}
