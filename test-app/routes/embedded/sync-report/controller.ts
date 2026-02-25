import { RequestHandler } from 'express'

export default class SyncReportController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res, _next) => {
    res.render('views/pages/menu.njk', {
      title: 'Synchronous reports',
      caption: 'HMPPS Data Hub frontend test site',
      cards: [
        {
          text: 'Validation',
          description: 'A test page for field validation.',
          href: '/embedded/sync/validation',
        },
        {
          text: 'Failing page',
          description: 'This page will fail to retrieve the definition and fail gracefully.',
          href: '/embedded/sync/fail',
        },
      ],
    })
  }
}
