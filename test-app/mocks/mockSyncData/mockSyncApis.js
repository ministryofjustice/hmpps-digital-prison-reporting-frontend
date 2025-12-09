// @ts-nocheck
const ReportingClient = require('../../../dist/dpr/data/reportingClient')
const definitions = require('./reportDefinition')
const data = require('./data')

const setUpMockSyncApis = (app) => {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  // Fake API routes for the /handler endpoint to call
  app.get('/definitions', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify([definitions.report]))
  })

  app.get('/definitions/test-report/:variantId', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(definitions.singleVariantReport(req.params.variantId)))
  })

  app.get('/definitions/failing-report/failing-variant', () => {
    throw new Error('Successfully failed.')
  })

  app.get('/reports/list', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('x-no-data-warning', 'Test message')
    res.end(JSON.stringify(data))
  })

  app.get('/reports/list/count', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ count: 5 }))
  })

  app.get('/reports/test-report/test-variant/field5', (req, res) => {
    const { prefix } = req.query

    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify(
        ['Fezzick', 'Inigo Montoya', 'Prince Humperdink', 'Princess Buttercup', 'Westley'].filter((p) =>
          p.toLowerCase().startsWith(prefix.toLowerCase()),
        ),
      ),
    )
  })
}

module.exports = setUpMockSyncApis
