// const app = require('./app')
import createApp from './app'
import { initServices } from './utils/initMockClients'

const app = createApp(initServices({
  bookmarking: true,
  download: true,
}))

// Port
const port = Number(process.env['PORT']) || 3010

// Start the server
// eslint-disable-next-line no-console
console.log(`Listening on port ${port} url: http://localhost:${port}`)
app.listen(port)
