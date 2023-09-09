Story: As a customer, I want to get predicted stock prices based off of weather patterns in a particular city so that I can make better investment decisions.

Endpoints:
`GET /forecast?stock={stock}&location={location}`
Examples could be `{ stock: 'AAPL', location: 'NYC' }`
The only supported location currently is 'NYC', and so if location is left blank it will default to NYC.

Logic:
Get the current stock price.
Retreive historical stock values for days with the same weather conditions (currently we only match on avg. temperature)
Find the avg. RATE OF CHANGE of stock vaelue for these days.
Apply that same rate of change to current stock value to achieve EOD & EOW projections of the stock's future value.

Install & Run:
Make sure you are using node v18+ (for, among other things, native ```fetch``` functionality).
Create a file in the root directory called `.env` and copy contents from `.env.template`
I will provide the PGPASSWORD & WEATHER_API_KEY env values and you can fill those in accordingly.

# For PostgreSQL installed with Homebrew
psql postgres -c "CREATE ROLE housing_cloud_demo_user WITH LOGIN CREATEDB PASSWORD ${env.PGPASSWORD};"
psql postgres -c "CREATE DATABASE housing_cloud_demo WITH OWNER housing_cloud_demo_user;"

- `npm install`
- `npm run migrate up`
- `npm run start`

I used Postman to check the GET /forecast endpoints. You may use something like:
`GET http://localhost:8080/forecast?stock=AAPL&location=NYC`

Slack instructions are forthcoming.
