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
  db
    .select()
    .from('zoos')
    .where({ id })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({ 
        "error": "Some useful error message, since you suck at making get by ID requests" 
      })
    })
})

// DELETE
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id }) // or .where(id, '=', id)
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
