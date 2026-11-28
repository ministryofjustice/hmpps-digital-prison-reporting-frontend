import { RequestHandler } from 'express'

export default class ComponentsController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Features',
      caption: 'HMPPS Data Hub frontend test site',
      cards: [
        {
          text: 'Internal Linking',
          description: 'Testing internal report linking functionality',
          href: '/features/internal-linking',
        },
      ],
    })
  }
}
