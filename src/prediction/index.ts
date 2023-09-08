import { getCurrentStockValue, getHistoricalStockValues } from '../stocks';
import { getWeatherForecast, getMatchingWeatherDates } from '../weather';

export type GetPredictionResponse = {
    stock: string,
    location: string,
    date: string,
    predictedStockValue: number
}

export async function getPrediction(stock: string, location: string = 'NYC'): Promise<GetPredictionResponse> {
    const currentStockValue = await getCurrentStockValue(stock)
    const weatherForecast = await getWeatherForecast(location)

    const result = { stock, location, date: weatherForecast[0].date }
    /**
        For now, find dates that match current days avg. temp.
        TODO: predict the stock's value for the next 5+ days based on weather forecast 
    */
    const matchingWeatherDates = await getMatchingWeatherDates(weatherForecast[0].avgTemp)

    if (!matchingWeatherDates.length) {
        return { ...result, predictedStockValue: currentStockValue }
    }

    const historicalStockValues = await getHistoricalStockValues(stock, matchingWeatherDates)

    /* Find average daily change of stock at particular dates with same weather patterns. */
    const averageChange = historicalStockValues
        .map(value => (value.close - value.open) / value.open)
        .reduce((a, b) => (a + b) / historicalStockValues.length)

    const predictedStockValue = currentStockValue + (averageChange * currentStockValue)

    return { ...result, predictedStockValue }
}
