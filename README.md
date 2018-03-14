# Hapi APi

## How to start
  - With docker `docker-compose up -d`
  - Without docker
    - make sure to use node `8.10.0`
    - run `npm i`
    - run `npm start`

## Run tests
  - `npm tests`

## Start DB
  - `npm run db:docker` or `docker run --name api-db -p 5432:5432 -e POSTGRES_PASSWORD=pass123 -e POSTGRES_USER=doron -e POSTGRES_DB=api_db -d postgres:9.6`

## Migration & Seed
  - Lastest migration `./node_modules/.bin/knex migrate:latest` or `npm migration:up`
  - Seed the db `./node_modules/.bin/knex seed`
