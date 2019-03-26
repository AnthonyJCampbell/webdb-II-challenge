const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();


server.use(express.json());
server.use(helmet());

// endpoints here
// POST
server.post('/api/zoos', (req, res) => {
  const name = req.body;
  console.log(name)
  db.insert(name)
    .into('zoos')
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({ 
        error: "Some useful error message" 
      });
    });
});

// GET ALL
server.get('/api/zoos', (req, res) => {
  db.select().from('zoos')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({ 
        error: "Some useful error message" 
      })
    })
})

//GET BY ID

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
