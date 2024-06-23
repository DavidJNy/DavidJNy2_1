// server.js
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database(":memory:"); // Or specify a file to persist data

// Initialize database
db.serialize(() => {
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
});

// Fetch messages for a chatroom
app.get("/api/chatrooms/:id/messages", (req, res) => {
  const chatroomId = req.params.id;
  db.all(
    "SELECT * FROM messages WHERE chatroom_id = ?",
    [chatroomId],
    (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json(rows);
      }
    }
  );
});

// Save a message
app.post("/api/chatrooms/:id/messages", (req, res) => {
  const chatroomId = req.params.id;
  const { sender, text } = req.body;
  db.run(
    "INSERT INTO messages (chatroom_id, sender, text) VALUES (?, ?, ?)",
    [chatroomId, sender, text],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.json({
          id: this.lastID,
          chatroom_id: chatroomId,
          sender,
          text,
          timestamp: new Date(),
        });
      }
    }
  );
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3006",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (chatroomId) => {
    socket.join(chatroomId);
    console.log(`User joined room: ${chatroomId}`);
  });

  socket.on("chatMessage", (msg) => {
    const { chatroomId, sender, text } = msg;
    db.run(
      "INSERT INTO messages (chatroom_id, sender, text) VALUES (?, ?, ?)",
      [chatroomId, sender, text],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          const newMessage = {
            id: this.lastID,
            chatroom_id: chatroomId,
            sender,
            text,
            timestamp: new Date(),
          };
          io.to(chatroomId).emit("message", newMessage);
        }
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
