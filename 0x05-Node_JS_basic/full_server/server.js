const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/', routes);

// Start the server on port 1245
app.listen(1245, () => {
  console.log('Server is running on http://localhost:1245');
});

module.exports = app;
