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
        error: "Some useful error message. Your post request is no good" 
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
        error: "Some useful error message, since you suck at making get requests" 
      })
    })
})

//GET BY ID
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  db.select().from('zoos').where({ id: id })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({ 
        error: "Some useful error message, since you suck at making get by ID requests" 
      })
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
