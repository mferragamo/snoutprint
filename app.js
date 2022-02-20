const express = require('express');
const app = express();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'snoutprint',
    password: 'snoutprint',
    database: 'snoutprint-db'
  }
});
const sql = require('./sql');

app.get('/example', async function (req, res) {
  // this query returns [ { id: 1, description: 'Hello' }, { id: 2, description: 'World' }]
  const results = await knex.raw(`SELECT id, description FROM example ORDER BY created_at`);
  
  res.json(results);
});

app.get('/example/:id', async function (req, res) {
  // this query returns [ { id: 1, description: 'Hello' } ]
  const results = await knex.raw(`SELECT id, description FROM example WHERE id = ?`, [ req.params.id ]);
  res.json(results[0]);
});

/**
 * YOUR CODE STARTS HERE
 */

// Gets a person's profile
 app.get('/person/:person_id', async function (req, res) {
  try {
    const {rows} = await knex.raw(sql.v1.fetchProfile, [req.params.person_id]);
    if(rows.length > 0)
    {
      res.json(rows[0]);
      res.status(200).send();
    }
    else
    {
      res.status(404).send();
    }
  } 
  catch (ex)
  {
    res.status(500).send();
  }
});

// Lists all of the person's pets (a flat list of pet objects; do not return soft-deleted data)
app.get('/person/:person_id/pets', async function (req, res) {
  try{
    const {rows} = await knex.raw(sql.v1.fetchPetsByPerson, [ req.params.person_id ]);
    if(rows.length > 0)
    {
      res.json(rows);
      res.status(200).send();
    }
    else
    {
      res.status(404).send();
    }
  }
  catch (ex)
  {
    res.status(500).send();
  }
});

// Lists all of the person's pets (a flat list of pet objects; do not return soft-deleted data)
// Now with registration!
app.get('/v2/person/:person_id/pets', async function (req, res) {
  try{
    const {rows} = await knex.raw(sql.v2.fetchPetsByPerson, [ req.params.person_id ]);
    if(rows.length > 0)
    {
      res.json(rows);
      res.status(200).send();
    }
    else
    {
      res.status(404).send();
    }
  }
  catch (ex)
  {
    res.status(500).send();
  }
});

// Lists all of the person's pets' records (a flat list of record objects; do not return soft-deleted data)
app.get('/person/:person_id/records', async function (req, res) {
  try {
    const {rows} = await knex.raw(sql.v1.fetchRecordsByPerson, [ req.params.person_id ]);
    if(rows.length > 0)
    {
      res.json(rows);
      res.status(200).send();
    }
    else
    {
      res.status(404).send();
    }
  } 
  catch (ex)
  {
    res.status(500).send();
  }
});

/**
 * END YOUR CODE SECTION
 */

app.listen(9001, function () {
  console.log('Snoutprint started and listening on port 9001!');
});
