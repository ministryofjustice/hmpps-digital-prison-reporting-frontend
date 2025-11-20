import { RequestHandler } from 'express'

export default class UserReportsController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'User Reports list variants',
      caption: 'Components',
      cards: [
        {
          text: 'User reports list',
          description: 'User reports list component example.',
          href: '/components/user-reports/default',
        },
        {
          text: 'Configured User reports list',
          description: 'User reports list component example with configuration',
          href: '/components/user-reports/configured',
        },
      ],
    })
  }
}
