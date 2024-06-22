const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);
const sqlite3 = require('sqlite3').verbose();

// Middleware to parse JSON
app.use(express.json());

// Example Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Database setup
const db = new sqlite3.Database('jokes.db');

// Initialize the database and jokes table
db.serialize(() => {
  // Create the jokes table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS jokes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  joke TEXT,
  is_default INTEGER DEFAULT 0
)`);

  // Check if the default jokes are already in the table
  db.get("SELECT COUNT(*) as count FROM jokes WHERE joke IN (?)", [[
    "Why don't skeletons fight each other? They don't have the guts.",
    "What do you call fake spaghetti? An impasta.",
    "How does a penguin build its house? Igloos it together.",
    "I'm reading a book on anti-gravity. It's impossible to put down.",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
    "I used to play piano by ear, but now I use my hands like everyone else.",
    "Why don't scientists trust atoms? Because they make up everything!",
    "How do you organize a space party? You planet.",
    "I would tell you a joke about an elevator, but it's an uplifting experience.",
    "Parallel lines have so much in common. It's a shame they'll never meet."
  ]], (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare("INSERT INTO jokes (joke, is_default) VALUES (?, 1)");

      const jokes = [
        "Why don't skeletons fight each other? They don't have the guts.",
        "What do you call fake spaghetti? An impasta.",
        "How does a penguin build its house? Igloos it together.",
        "I'm reading a book on anti-gravity. It's impossible to put down.",
        "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
        "I used to play piano by ear, but now I use my hands like everyone else.",
        "Why don't scientists trust atoms? Because they make up everything!",
        "How do you organize a space party? You planet.",
        "I would tell you a joke about an elevator, but it's an uplifting experience.",
        "Parallel lines have so much in common. It's a shame they'll never meet."
      ];

      // Insert each joke into the jokes table
      jokes.forEach(joke => {
        stmt.run(joke);
      });

      // Finalize the statement
      stmt.finalize();
      
      console.log('Default jokes inserted into the database.');
    } else {
      console.log('Default jokes are already in the database.');
    }
  });
});



// Define API routes

// Get all dad jokes
app.get('/api/jokes', (req, res) => {
  db.all('SELECT * FROM jokes', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a random dad joke
app.get('/api/jokes/random', (req, res) => {
  db.get('SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Add a new dad joke
app.post('/api/jokes', (req, res) => {
  const { joke } = req.body;
  db.run('INSERT INTO jokes (joke) VALUES (?)', [joke], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, joke });
  });
});

// Add this route to delete a joke
// Delete a joke by ID
app.delete('/api/jokes/:id', (req, res) => {
  const jokeId = req.params.id;

  // Check if the joke is a default joke
  db.get('SELECT * FROM jokes WHERE id = ?', [jokeId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Check if the joke is one of the default jokes
    if (row) {
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
        "Parallel lines have so much in common. It's a shame they'll never meet."
      ];

      if (defaultJokes.includes(row.joke)) {
        res.status(400).json({ error: "Cannot delete default jokes." });
        return;
      }
    }

    // Proceed with deleting the joke if it's not a default joke
    db.run('DELETE FROM jokes WHERE id = ?', [jokeId], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Joke deleted successfully.", changes: this.changes });
    });
  });
});




// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// Serve index.html for all other routes
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the Express server
server.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`);
});