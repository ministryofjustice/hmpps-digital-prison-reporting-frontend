import { RequestHandler } from 'express'

export default class CatalogueController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Catalogue variants',
      caption: 'Components',
      cards: [
        {
          text: 'Default catalogue',
          description: 'Catalogue component example.',
          href: '/components/catalogue/default',
        },
        {
          text: 'Configured catalogue',
          description: 'Catalogue component example with configuration',
          href: '/components/catalogue/configured',
        },
      ],
    })
  }
}
