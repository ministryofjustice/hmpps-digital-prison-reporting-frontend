import ReportingClient from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/data/reportingClient'

app.get('/dynamic-values/:fieldName', (req, res, next) => {
  new ReportingClient.default({
    url: 'http://localhost:3010',
    agent: {
      timeout: 8000,
    },
  })
    .getFieldValues({
      token: 'token',
      definitionName: 'test-report',
      variantName: 'test-variant',
      fieldName: req.params.fieldName,
      prefix: req.query.prefix.toString(),
    })
    .then((result) => {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result))
    })
    .catch((err) => {
      next(err)
    })
})
