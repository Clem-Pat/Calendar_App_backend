const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: 'autorack.proxy.rlwy.net',
  port: 33328,
  user: 'root',
  password: 'VeucxKPpzypxltmUjplTqWuDoYoPOsih',
  database: 'railway',
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

app.post('/diners', (req, res) => {
  const { name, date } = req.body;  // Assuming you're sending the diner data in the request body
  
  const query = 'INSERT INTO diner (name, date) VALUES (?, ?)';
  db.query(query, [name, date], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Database query error');
      return;
    }
    res.status(201).json({ id: results.insertId, name, date }); // Send back the created diner info, including the new ID
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
