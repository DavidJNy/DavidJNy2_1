// Importing required modules
const express = require('express');

// Creating an Express application
const app = express();
const path = require('path');

// Define a route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} http://localhost:3000/`);
});

app.use(express.static("build"));