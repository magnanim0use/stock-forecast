import { getCurrentStockValue, getHistoricalStockValues } from '../stocks';
import { getWeatherForecast, getMatchingWeatherDates } from '../weather';

export async function getPrediction(stock: string, location?: string) {
    const currentStockValue = await getCurrentStockValue(stock)
    const weatherForecast = await getWeatherForecast(location || 'NYC')
    const matchingWeatherDates = await getMatchingWeatherDates(weatherForecast[0].avgTemp)
    const historicalStockValues = await getHistoricalStockValues(stock, matchingWeatherDates)

    /* Find average daily change of stock at particular dates */
    const averageChange = historicalStockValues
        .map(value => (value.close - value.open) / value.open)
        .reduce((a, b) => (a + b) / historicalStockValues.length)

    const predictedStockValue = currentStockValue + (averageChange * currentStockValue)

    return predictedStockValue
}
