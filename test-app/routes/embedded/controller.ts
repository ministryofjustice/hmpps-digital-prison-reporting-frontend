import { RequestHandler } from 'express'

export default class EmbeddedController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res, _next) => {
    res.render('views/pages/menu.njk', {
      title: 'Embedded reporting',
      caption: 'HMPPS Data Hub frontend test site',
      cards: [
        {
          text: 'Platform',
          description: 'Platform integration example',
          href: '/embedded/platform/',
        },
        {
          text: 'Synchronous reports',
          description: 'Sychronous report example',
          href: '/embedded/sync',
        },
      ],
    })
  }
}
