/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser')
const AsyncFiltersUtils = require('../../../../package/dpr/components/async-filters/utils').default
const AsyncReportListUtils = require('../../../../package/dpr/components/async-report-list/utils').default
const AsyncPollingUtils = require('../../../../package/dpr/components/async-polling/utils').default

const addAsyncReportingRoutes = ({ app, asyncReportsStore, dataSources }) => {
  // 1 - get filters for the report + make request
  app.get('/async-reports/:reportId/:variantId/request', async (req, res, next) => {
    res.render('async-request.njk', {
      title: 'Request Report',
      postEndpoint: '/requestReport/',
      ...(await AsyncFiltersUtils.renderFilters({ req, res, dataSources, next })),
    })
  })

  // 2 - handle the post request to request the report data
  app.use(bodyParser.json())
  app.post('/requestReport/', async (req, res, next) => {
    const redirectToPollingPage = await AsyncFiltersUtils.requestReport({
      req,
      res,
      dataSources,
      asyncReportsStore,
      next,
    })
    res.redirect(redirectToPollingPage)
    res.end()
  })

  // 3 - polling the status of the request
  app.get('/async-reports/:reportId/:variantId/request/:executionId', async (req, res, next) => {
    res.render('async-polling.njk', {
      title: 'Report Requested',
      ...(await AsyncPollingUtils.renderPolling({ req, res, dataSources, asyncReportsStore, next })),
    })
  })

  // 3 - load the report data
  app.get('/async-reports/:reportId/:reportVariantId/request/:tableId/report', async (req, res, next) => {
    res.render('async-report.njk', {
      ...(await AsyncReportListUtils.renderReport({
        req,
        res,
        dataSources,
        asyncReportsStore,
        url: req._parsedUrl,
        next,
      })),
    })
  })
}

module.exports = addAsyncReportingRoutes
