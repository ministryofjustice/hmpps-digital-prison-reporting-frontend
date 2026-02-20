import { initUserReports } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/userReportsListUtils'


export function routes(services: Services): Router {

  ...

  router.get('/path/to/requested/reports/list/', (req, res) => {

    const {
      requestedReports,
    } = await initUserReports({ res, req, services })

    res.render('requested-reports.njk', {
      requestedReports,
    })
  })
}

export default routes
