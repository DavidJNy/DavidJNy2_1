const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
// const https = require('https');
const port = process.env.PORT || 3000;; // Choose a port number for your Express server

// // Serve static files from the 'build' folder
// app.use(express.static(path.join(__dirname, 'build')));


// const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/davidjny.asuscomm.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/davidjny.asuscomm.com/fullchain.pem')
// };

// https.createServer(options, app).listen(port, () => {
//     console.log('HTTPS Server running on port ${port}');
// });

// Define your API routes or other routes here

// Serve index.html for all other routes
app.get('/*', function(req, res) {
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// Start the Express server
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});


