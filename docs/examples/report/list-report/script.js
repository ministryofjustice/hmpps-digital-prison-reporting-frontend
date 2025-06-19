import ReportListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/report-list/utils'

app.get('/data', (req, res, next) => {
  const MyVariantDefinition = Promise.resolve(reportName, variantName)
  const args = {
    title: 'Test app',
    reportName: 'ReportName',
    variantDefinition: MyVariantDefinition,
    getListDataSources: () => ({
      data: Promise.resolve(data),
      count: Promise.resolve(data.length),
    }),
    otherOptions: {
      exampleOption: true,
    },
    layoutTemplate: 'views/page.njk',
  }

  ReportListUtils.renderListWithData({
    ...args,
    request: req,
    response: res,
    next,
  })
})

app.get('/method', (req, res, next) => {
  const args = {
    title: 'Method',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: 'http://localhost:3010',
    layoutTemplate: 'views/page.njk',
  }

  ReportListUtils.renderListWithDefinition({
    ...args,
    request: req,
    response: res,
    next,
  })
})

app.get(
  '/handler',
  ReportListUtils.createReportListRequestHandler({
    title: 'Test app',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: `http://localhost:3010`,
    apiTimeout: 10000,
    layoutTemplate: 'views/page.njk',
    tokenProvider: (req, res, next) => res.locals.user.token,
    definitionsPath: 'definitions/prisons/test',
  }),
)
