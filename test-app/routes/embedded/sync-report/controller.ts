import { RequestHandler } from 'express'

export default class SyncReportController {
  layoutPath = ''

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/menu.njk', {
      title: 'Synchronous reports',
      caption: 'HMPPS Data Hub frontend test site',
      cards: [
        {
          text: 'Method',
          description: 'A test page rendered using the renderListWithData method.',
          href: '/embedded/sync/method?dataProductDefinitionsPath=test-location',
        },
        {
          text: 'Handler',
          description:
            'A test page rendered using the createReportListRequestHandler method to create a request handler.',
          href: '/embedded/sync/handler',
        },
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
