const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT || 3000,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to fetch diners
app.get('/diners', (req, res) => {
  const query = 'SELECT * FROM diner';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results); // Send results as JSON
  });
});

// Route to fetch diners
app.get('/sets', (req, res) => {
  const query = 'SELECT * FROM sets';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results); // Send results as JSON
  });
});

// Route to fetch diners
app.get('/guests', (req, res) => {
  const query = 'SELECT * FROM guests';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results); // Send results as JSON
  });
});


// Insert Diner
app.post('/diners', (req, res) => {
  const { name, date } = req.body;
  const query = 'INSERT INTO diner (name, date) VALUES (?, ?)';
  db.query(query, [name, date], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to INSERT INTO diner (name, date) VALUES (?, ?) with values: ${name}, ${date}`);
      return;
    }
    res.status(201).json({ id: results.insertId, name, date });
  });
});

// Get All Diners
app.get('/diners', (req, res) => {
  const query = 'SELECT * FROM diner';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);
  });
});

// Get Diner by ID
app.get('/diners/:id', (req, res) => {
  const query = 'SELECT * FROM diner WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Diner not found');
      return;
    }
    res.json(results[0]);
  });
});

// Insert Guest
app.post('/guests', (req, res) => {
  const { first_name, name } = req.body;
  const query = 'INSERT INTO Guest (first_name, name) VALUES (?, ?)';
  db.query(query, [first_name, name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to INSERT INTO Guest (first_name, name) VALUES (?, ?) with values: ${first_name}, ${name}`);
      return;
    }
    res.status(201).json({ id: results.insertId, first_name, name });
  });
});

// Insert Set
app.post('/sets', (req, res) => {
  const { name, description, ingredients, recipe } = req.body;
  const query = 'INSERT INTO Set (name, description, ingredients, recipe) VALUES (?, ?, ?, ?)';
  db.query(query, [name, description, ingredients, recipe], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to INSERT INTO Set (name, description, ingredients, recipe) VALUES (?, ?, ?, ?) with values: ${name}, ${description}, ${ingredients}, ${recipe}`);
      return;
    }
    res.status(201).json({ id: results.insertId, name, description, ingredients, recipe });
  });
});

// Insert Diner Guest
app.post('/diner_guests', (req, res) => {
  const { diner_id, guest_id } = req.body;
  const query = 'INSERT INTO diner_Guest (diner_id, Guest_id) VALUES (?, ?)';
  db.query(query, [diner_id, guest_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to INSERT INTO diner_Guest (diner_id, Guest_id) VALUES (?, ?) with values: ${diner_id}, ${guest_id}`);
      return;
    }
    res.status(201).send();
  });
});

// Insert Diner Set
app.post('/diner_sets', (req, res) => {
  const { diner_id, set_id } = req.body;
  const query = 'INSERT INTO diner_Set (diner_id, Set_id) VALUES (?, ?)';
  db.query(query, [diner_id, set_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to INSERT INTO diner_Set (diner_id, Set_id) VALUES (?, ?) with values: ${diner_id}, ${set_id}`);
      return;
    }
    res.status(201).send();
  });
});

// Delete Diner
app.delete('/diners/:id', (req, res) => {
  const query = 'DELETE FROM diner WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.send();
  });
});

// Delete Guest
app.delete('/guests/:id', (req, res) => {
  const query = 'DELETE FROM Guest WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.send();
  });
});

// Delete Set
app.delete('/sets/:id', (req, res) => {
  const query = 'DELETE FROM Set WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.send();
  });
});

// Delete Diner Guest
app.delete('/diner_guests', (req, res) => {
  const { diner_id, guest_id } = req.body;
  const query = 'DELETE FROM diner_Guest WHERE diner_id = ? AND Guest_id = ?';
  db.query(query, [diner_id, guest_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to DELETE FROM diner_Guest WHERE diner_id = ? AND Guest_id = ? with values: ${diner_id}, ${guest_id}`);
      return;
    }
    res.send();
  });
});

// Delete Diner Set
app.delete('/diner_sets', (req, res) => {
  const { diner_id, set_id } = req.body;
  const query = 'DELETE FROM diner_Set WHERE diner_id = ? AND Set_id = ?';
  db.query(query, [diner_id, set_id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to DELETE FROM diner_Set WHERE diner_id = ? AND Set_id = ? with values: ${diner_id}, ${set_id}`);
      return;
    }
    res.send();
  });
});

// Update Diner
app.put('/diners/:id', (req, res) => {
  const { name, date } = req.body;
  const query = 'UPDATE diner SET name = ?, date = ? WHERE id = ?';
  db.query(query, [name, date, req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to UPDATE diner SET name = ?, date = ? WHERE id = ? with values: ${name}, ${date}, ${req.params.id}`);
      return;
    }
    res.send();
  });
});

// Update Guest
app.put('/guests/:id', (req, res) => {
  const { first_name, name } = req.body;
  const query = 'UPDATE Guest SET first_name = ?, name = ? WHERE id = ?';
  db.query(query, [first_name, name, req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to UPDATE Guest SET first_name = ?, name = ? WHERE id = ? with values: ${first_name}, ${name}, ${req.params.id}`);
      return;
    }
    res.send();
  });
});

// Update Set
app.put('/sets/:id', (req, res) => {
  const { name, description, ingredients, recipe } = req.body;
  const query = 'UPDATE Set SET name = ?, description = ?, ingredients = ?, recipe = ? WHERE id = ?';
  db.query(query, [name, description, ingredients, recipe, req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(`Database query error trying to UPDATE Set SET name = ?, description = ?, ingredients = ?, recipe = ? WHERE id = ? with values: ${name}, ${description}, ${ingredients}, ${recipe}, ${req.params.id}`);
      return;
    }
    res.send();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
