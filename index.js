const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

// Define the database
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/sqlite3',
  },
  useNullAsDefault: true,
});

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
