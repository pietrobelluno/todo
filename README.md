# todo list by Pietro Belluno

## how to run 
  - first of all you need to clone the project to your machine.
  - second you need to create a database in `postgres`
  

### run frontend:
  - `cd frontend`
  - you need to create `.env` file and setup the api url, see `.env-example` file
  - run `npm run start`
  - the frontend will run in http://localhost:3000/

### run backend:
  - `cd backend`
  - create a `.env` file and setup the database connections, see the `.env-example` file
  - run `npm run start`
  - the backend will run in http://localhost:8081/

### running tests:
  - `cd` to either the frontend or backend folder
  - run `npm run test`
  - run `npm run test:cov` if you want to see the coverage report



## video preview:
https://user-images.githubusercontent.com/23633309/186058531-50060397-87dd-47cb-852b-2c6b82aa3913.mp4


## image preview:
<img width="476" alt="Screen Shot 2022-08-22 at 23 22 38" src="https://user-images.githubusercontent.com/23633309/186055516-80f67937-994d-4a7b-8844-9bd8892813e2.png">

## used technologies
  - React
  - Typescript
  - Nest
  - TypeORM
  - Jest
  - Testing Library
  - Material UI
  - Styled Components
