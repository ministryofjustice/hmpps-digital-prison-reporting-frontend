import { initUserReports } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/userReportsListUtils'


export function routes(services: Services): Router {

  // ...

  router.get('/path/to/requested/reports/list/', (req, res) => {

    const userReportsLists = await initUserReports({ res, req, services })

    res.render('requested-reports.njk', {
      userReportsLists
    })
  })
}

export default routes
