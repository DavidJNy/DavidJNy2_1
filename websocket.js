const WebSocket = require("ws");
const express = require("express");
const http = require("http");

// Set up the express app
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "new_user":
        clients.set(ws, data.username);
        broadcast(
          JSON.stringify({ type: "users", users: Array.from(clients.values()) })
        );
        break;
      case "message":
        broadcast(
          JSON.stringify({
            type: "message",
            username: data.username,
            message: data.message,
          })
        );
        break;
      default:
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    broadcast(
      JSON.stringify({ type: "users", users: Array.from(clients.values()) })
    );
  });
});

function broadcast(data) {
  clients.forEach((_, client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
