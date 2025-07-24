import { RequestHandler } from 'express'
import { renderListWithDefinition } from '../../../../../dist/dpr/components/report-list/utils'

export default class SyncReportFailController {
  GET: RequestHandler = async (req, res, next) => {
    renderListWithDefinition({
      title: 'Fail',
      definitionName: 'failing-report',
      variantName: 'failing-variant',
      request: req,
      response: res,
      next,
      apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
      layoutTemplate: 'views/page.njk',
      otherOptions: {
        breadCrumbList: [
          { text: 'Home', href: '/' },
          { text: 'Embedded reports', href: '/embedded' },
          { text: 'Synchronous reports', href: '/embedded/sync' },
        ],
      },
      apiTimeout: 0,
      token: 'token',
    })
  }
}
