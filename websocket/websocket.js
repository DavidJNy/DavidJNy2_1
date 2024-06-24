const { Server } = require("socket.io");
const db = require("../config/db"); // Assuming this file handles database initialization and connection

function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
        origin: "https://www.davidjny.com",
        methods: ["GET", "POST"],
        allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
        credentials: true
    }
});

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (chatroomId) => {
      socket.join(chatroomId);
      console.log(`User joined room: ${chatroomId}`);
    });

    socket.on("chatMessage", async (msg) => {
      const { chatroomId, sender, text } = msg;

      // Insert message into the database
      try {
        const insertQuery = `
          INSERT INTO messages (chatroom_id, sender, text) 
          VALUES (?, ?, ?)
        `;
        const params = [chatroomId, sender, text];

        await db.run(insertQuery, params);

        const newMessage = {
          id: this.lastID, // Adjust this depending on your database setup
          chatroom_id: chatroomId,
          sender,
          text,
          timestamp: new Date(),
        };

        // Emit the new message to all clients in the chatroom
        io.to(chatroomId).emit("message", newMessage);
      } catch (error) {
        console.error("Error inserting message into database:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = setupWebSocket;
