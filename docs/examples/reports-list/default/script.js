import { initUserReports } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/userReportDEFstUtils'


export function routes(services: Services): Router {

  ...

  router.get('/path/to/requested/reports/list/', (req, res) => {

    const userReportDEFsts = await initUserReports({ res, req, services })

    res.render('requested-reports.njk', {
      userReportDEFsts
    })
  })
}

export default routes
