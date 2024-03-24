# README

## Live demo
URL https://weather-app.alexandrearaujo.tech/

## setup
asdf ruby
asdf nodejs

## Development
### Frontend
- Command: `yarn start`
- URL: http://localhost:3001/app

### Backend
- Command: `rails server`

## Production
### Build and run: `docker-compose -f docker-compose.prod-vps.yml up --build -d` 

### Run migration
`docker exec -it weather-app-web bin/rails db:migrate`

### Rails console
`docker exec -it weather-app-web bin/rails console`
