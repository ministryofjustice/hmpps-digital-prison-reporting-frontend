import { RequestHandler } from 'express'

export default class TemplateController {
  layoutPath: string

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/menu.njk', {
      title: 'Report templates',
      cards: [
        {
          text: 'List',
          description: 'Examplate of a list report template',
          href: '/templates/list',
        },
        {
          text: 'List section',
          description: 'Examplate of a list-section report template',
          href: '/templates/list-section',
        },
        {
          text: 'Parent child',
          description: 'Examplate of a parent-child report template',
          href: '/templates/parent-child',
        },
        {
          text: 'Parent child section',
          description: 'Examplate of a parent-child-section report template',
          href: '/templates/parent-child-section',
        },
        {
          text: 'Row section',
          description: 'Examplate of a row-section report template',
          href: '/templates/row-section',
        },
        {
          text: 'Row section child',
          description: 'Examplate of a row-section-child report template',
          href: '/templates/row-section-child',
        },
        {
          text: 'Summary',
          description: 'Examplate of a summary report template',
          href: '/templates/summary',
        },
        {
          text: 'Summary section',
          description: 'Examplate of a summary-section report template',
          href: '/templates/summary-section',
        },
      ],
    })
  }
}
