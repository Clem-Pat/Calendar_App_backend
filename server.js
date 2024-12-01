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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
