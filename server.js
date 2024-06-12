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
const db = new sqlite3.Database('jokes.db');

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// Serve index.html for all other routes
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Define your API routes or other routes here


// Start the Express server
server.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`);
});

// Dad Jokes

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