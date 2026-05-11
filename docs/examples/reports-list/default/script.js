import { initMyReports } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/myReportsListUtils'


export function routes(services: Services): Router {
  // ...
  router.get('/path/to/requested/reports/list/', (req, res) => {
    const myReportsData = await initMyReports({ res, req, services })
    res.render('requested-reports.njk', {
      myReportsData
    })
  })
}

export default routes
