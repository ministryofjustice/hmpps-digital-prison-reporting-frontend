import UserReportsListUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/user-reports/utils'


export default function routes (services: Services): Router {

  ...

  router.get('/path/to/requested/reports/list/', (req, res) => {

    const userReportsLists = await UserReportsListUtils.init({ res, req, services })

    res.render('requested-reports.njk', {
      userReportsLists
    })
  })
}
