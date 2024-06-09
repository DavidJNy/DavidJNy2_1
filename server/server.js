const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// Define your API routes or other routes here

// Serve index.html for all other routes
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the Express server
server.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON
app.use(express.json());

// User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// Chat message schema and model
const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);

// Route for user registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.sendStatus(201);
});

// Route for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
});

// Middleware to authenticate socket connections
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
            if (err) return next(new Error('Authentication error'));
            socket.username = decoded.username;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log(`User ${socket.username} connected`);

    socket.on('message', async (msg) => {
        const message = new Message({ username: socket.username, message: msg });
        await message.save();
        io.emit('message', { username: socket.username, message: msg });
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.username} disconnected`);
    });
});
