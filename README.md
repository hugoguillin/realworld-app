This project is a fork of [this one](https://github.com/TonyMckes/conduit-realworld-example-app), but customized to be used with test automation frameworks. That means that DOM elements have been added with the `data-testid` attribute, and the project can be run with docker-compose.


### Usage

To run the project, follow these steps:

1. Start the development server by executing the command:

   ```bash
   docker-compose up
   ```

2. Open a web browser and navigate to:
   - Home page should be available at [`http://localhost:3000/`](http://localhost:3000).
   - API endpoints should be available at [`http://localhost:3001/api`](http://localhost:3001/api).


#### Development Server
As described in the original project, you can run the development server like this:
1. Create a `.env` file in the `backend` directory with the same content as the `.env.example` file. You can customize the values if you want.
2. Install dependencies with `npm install`.
3. You need an instance of a database running. The easiest way is to use a docker container. Run the following command to start a PostgreSQL database:

   ```bash
   docker run --name realworldapp-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
   ```
4. Create the database. You can run the following command from the root directory of the project:

   ```bash
   npm run sqlz -- db:create
   ```
5. Start the development server with `npm run dev`.
6. Open a web browser and navigate to [`http://localhost:3000/`](http://localhost:3000).
7. Optionally, you can populate the database with `npm run sqlz -- db:seed:all`.


