Story
App synopsis
- business logic
- endpoint GET /forecast { params: { stock, location? } }

- make sure you are using node v18+ (native fetch functionality)
- install & run Docker Desktop [https://docs.docker.com/desktop/inst]
- copy .env.template > .env and fill in PGPASSWORD & WEATHER_API_KEY

# For PostgreSQL installed with Homebrew
psql postgres -c "CREATE ROLE housing_cloud_demo_user WITH LOGIN CREATEDB PASSWORD 'password';"
psql postgres -c "CREATE DATABASE housing_cloud_demo WITH OWNER housing_cloud_demo_user;"

- `npm install`
- `npm run migrate up`
- `npm run start`



