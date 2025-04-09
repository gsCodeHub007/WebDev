const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    return console.error('❌ Database connection error:', err.message);
  }
  console.log('✅ Connected to the SQLite database.');
});

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL 
  )
`);

module.exports = db;
