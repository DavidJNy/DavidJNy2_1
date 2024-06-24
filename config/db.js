const sqlite3 = require("sqlite3").verbose();

// Initialize and set up the database
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS jokes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    joke TEXT,
    is_default INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS chatrooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chatroom_id INTEGER,
    sender TEXT,
    text TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chatroom_id) REFERENCES chatrooms(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  const defaultJokes = [
    "Why don't skeletons fight each other? They don't have the guts.",
    "What do you call fake spaghetti? An impasta.",
    "How does a penguin build its house? Igloos it together.",
    "I'm reading a book on anti-gravity. It's impossible to put down.",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
    "I used to play piano by ear, but now I use my hands like everyone else.",
    "Why don't scientists trust atoms? Because they make up everything!",
    "How do you organize a space party? You planet.",
    "I would tell you a joke about an elevator, but it's an uplifting experience.",
    "Parallel lines have so much in common. It's a shame they'll never meet.",
  ];

  db.get(
    "SELECT COUNT(*) as count FROM jokes WHERE is_default = 1",
    (err, row) => {
      if (row.count === 0) {
        const stmt = db.prepare(
          "INSERT INTO jokes (joke, is_default) VALUES (?, 1)"
        );
        defaultJokes.forEach((joke) => stmt.run(joke));
        stmt.finalize();
        console.log("Default jokes inserted into the database.");
      } else {
        console.log("Default jokes are already in the database.");
      }
    }
  );
});

module.exports = db;
