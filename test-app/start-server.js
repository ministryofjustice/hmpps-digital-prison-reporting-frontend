const app = require('./server')

// Port
const port = Number(process.env.PORT) || 3000

// Start the server
// eslint-disable-next-line no-console
console.log(`Listening on port ${port} url: http://localhost:${port}`)
app.listen(port)
