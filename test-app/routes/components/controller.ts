import { RequestHandler } from 'express'

export default class ComponentsController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Components',
      caption: 'HMPPS Data Hub frontend test site',
      cards: [
        {
          text: 'Reports Catalogue',
          description: 'The reports catalogue',
          href: '/components/reports-catalogue',
        },
        {
          text: 'User reports',
          description: 'User reports component.',
          href: '/components/user-reports',
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
        {
          text: 'Truncate',
          description: 'Truncate functionality',
          href: '/components/truncate',
        },
      ],
    })
  }
}
