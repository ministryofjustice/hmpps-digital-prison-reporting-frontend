const app = require('./server');

// Port
const port = Number(process.env.PORT) || 3000

// Start the server
console.log('Listening on port ' + port + ' url: http://localhost:' + port);
app.listen(port);
