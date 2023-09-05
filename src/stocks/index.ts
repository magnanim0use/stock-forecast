import yahooFinance from 'yahoo-finance2'

export async function getCurrentStockValue(stock: string) {
    const result = await yahooFinance.quote(stock)
    return result.regularMarketPrice
}

export async function getHistoricalStockValues(stock: string, dates: string[]) {
    const results = await Promise.all(dates.map(async (date) => yahooFinance.historical(stock, { period1: date, interval: '1d' })))
    return results.map(result => {
        const { date, open, close } = result[0]
        return {
            date,
            open,
            close
        }
    })
}
