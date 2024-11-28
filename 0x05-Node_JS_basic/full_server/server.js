const express = require('express');
const routes = require('./routes'); // Import routes from full_server/routes/index.js

const app = express();

// Use the routes defined in the routes/index.js file
app.use('/', routes);

// Start the server on port 1245
app.listen(1245, () => {
    console.log('Server is running on http://localhost:1245');
});

module.exports = app;