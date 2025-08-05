import { RequestHandler } from 'express'

export default class HomepageController {
  layoutPath: string

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/menu.njk', {
      title: 'HMPPS Data Hub frontend test site',
      cards: [
        {
          text: 'Embedded Reporting',
          description: 'Reports that are requested and displayed separately.',
          href: '/embedded',
        },
        {
          text: 'Components',
          description: 'Component testing',
          href: '/components',
        },
        {
          text: 'Report templates',
          description: 'Template testing',
          href: '/templates',
        },
      ],
    })
  }
}
