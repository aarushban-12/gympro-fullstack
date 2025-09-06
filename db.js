const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./gympro.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    name TEXT,
    gender TEXT,
    age INTEGER
  )
`);

// db.run(`
// CREATE TABLE IF NOT EXISTS user_stats (
//   user_id INTEGER PRIMARY KEY,     
//   steps_walked INTEGER DEFAULT 0,
//   water_intake_ml INTEGER DEFAULT 0,
//   weight INTEGER DEFAULT 0,
//   height INTEGER DEFAULT 0,
//   max_bench INTEGER DEFAULT 0,
//   max_squat INTEGER DEFAULT 0,
//   max_deadlift INTEGER DEFAULT 0, 
//   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// )
// `);

db.run(`CREATE TABLE IF NOT EXISTS user_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`);

module.exports = db;
