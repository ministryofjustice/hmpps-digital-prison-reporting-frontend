import { RequestHandler } from 'express'

export default class ComponentsController {
  layoutPath = ''

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/menu.njk', {
      title: 'Components',
      caption: 'HMPPS Data Hub frontend test site',
      cards: [
        {
          text: 'Catalogue',
          description: 'Catalogue component.',
          href: '/components/catalogue',
        },
        {
          text: 'User reports',
          description: 'User reports component.',
          href: '/components/user-reports',
        },
        {
          text: 'Search',
          description: 'Search component.',
          href: '/components/search',
        },
        {
          text: 'Filter inputs',
          description: 'Filter input components.',
          href: '/components/filters',
        },
        {
          text: 'Dashboard',
          description: 'Dashboard components.',
          href: '/components/dashboards',
        },
      ],
    })
  }
}
