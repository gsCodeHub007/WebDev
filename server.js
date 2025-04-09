const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // to parse form data

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/login', (req, res) => {
  const { user_id, password } = req.body;
  console.log(`Attempting login with: user_id = ${user_id}, password = ${password}`); // Add this line

  db.get(`SELECT * FROM users WHERE user_id = ? AND password = ?`, [user_id, password], (err, row) => {
    if (err) {
      console.error("Database error during login:", err); // Add this line
      return res.status(500).send('Database error.');
    }
    if (row) {
      console.log(`✅ Login Success: user_id = ${user_id}, password = ${password}`);
      res.send(`<h1>Welcome, ${row.user_id}!</h1>`);
    } else {
      console.log("❌ Login failed: No matching user found."); // Add this line
      res.send(`<h1>Login failed: Invalid credentials.</h1>`);
    }
  });
});

app.post('/register', (req, res) => {
  const { user_id, password } = req.body;

  const query = `INSERT INTO users (user_id, password) VALUES (?, ?)`;

  db.run(query, [user_id, password], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.send("<h1>Username already exists. Try a different one.</h1>");
      }
      return res.status(500).send("<h1>Error registering user.</h1>");
    }
    console.log(`✅ Registered: user_id = ${user_id}, password = ${password}`);
    res.send(`<h1>Registration successful! Welcome, ${user_id}.</h1>`);
  });
});