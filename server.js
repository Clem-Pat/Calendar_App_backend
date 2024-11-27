const express = require('express');
const mysql = require('mysql');

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

app.get('/', (req, res) => {
  res.send('Hello from Railway!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
