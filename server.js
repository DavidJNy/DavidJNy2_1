const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const jokeRoutes = require("./routes/jokeRoutes");
const authRoutes = require("./routes/authRoutes");
const setupWebSocket = require("./websocket/websocket");
const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://localhost:3001",
  })
);

// Routes
app.use("/api/jokes", jokeRoutes);
app.use("/api/auth", authRoutes);

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, "build")));

// Serve index.html for all other routes
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Initialize WebSocket
setupWebSocket(server);

// Start the Express server
server.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`);
});
