import { RequestHandler } from 'express'

export default class TemplateController {
  layoutPath: string

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/menu.njk', {
      title: 'Report templates',
      cards: [
        {
          text: 'list',
          description: 'Examplate of a list report template',
          href: '/templates/list',
        },
        {
          text: 'list-section',
          description: 'Examplate of a list-section report template',
          href: '/templates/list-section',
        },
        {
          text: 'list-section with summaries',
          description: 'Examplate of a list-section report template',
          href: '/templates/list-section-summaries',
        },
        {
          text: 'parent-child',
          description: 'Examplate of a parent-child report template',
          href: '/templates/parent-child',
        },
        {
          text: 'parent-child-section',
          description: 'Examplate of a parent-child-section report template',
          href: '/templates/parent-child-section',
        },
        {
          text: 'row-section',
          description: 'Examplate of a row-section report template',
          href: '/templates/row-section',
        },
        {
          text: 'row-section-child',
          description: 'Examplate of a row-section-child report template',
          href: '/templates/row-section-child',
        },
        {
          text: 'summary',
          description: 'Examplate of a summary report template',
          href: '/templates/summary',
        },
        {
          text: 'summary-section',
          description: 'Examplate of a summary-section report template',
          href: '/templates/summary-section',
        },
      ],
    })
  }
}
