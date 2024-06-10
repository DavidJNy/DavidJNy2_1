const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

io.on('connection', socket => {
  console.log('Client connected');

  // Send a welcome message to the client
  socket.emit('message', 'Welcome to the Socket.IO server!');

  // Handle incoming messages from clients
  socket.on('message', message => {
    console.log(`Received: ${message}`);
    // Echo the message back to the client
    socket.emit('message', `Server received: ${message}`);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Socket.IO server is running on http://localhost:3001');
});
