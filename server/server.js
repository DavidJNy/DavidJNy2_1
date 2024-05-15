const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // Choose a port number for your Express server

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// Define your API routes or other routes here

// Serve index.html for all other routes
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
