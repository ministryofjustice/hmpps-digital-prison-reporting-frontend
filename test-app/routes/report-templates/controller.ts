import { RequestHandler } from 'express'

export default class TemplateController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Report templates',
      cards: [
        {
          text: 'list',
          description: 'Example of a "list" report template',
          href: '/templates/list',
        },
        {
          text: 'list, with summaries',
          description: 'Example of a "list" report template, with summaries',
          href: '/templates/list-summaries',
        },
        {
          text: 'list-section',
          description: 'Example of a "list-section" report template',
          href: '/templates/list-section',
        },
        {
          text: 'list-section, with summaries',
          description: 'Example of a "list-section" report template, with summaries',
          href: '/templates/list-section-summaries',
        },
        {
          text: 'parent-child',
          description: 'Example of a "parent-child" report template',
          href: '/templates/parent-child',
        },
        {
          text: 'parent-child-section',
          description: 'Example of a "parent-child-section" report template',
          href: '/templates/parent-child-section',
        },
        {
          text: 'summary',
          description: 'Examplate of a "summary" report template',
          href: '/templates/summary',
        },
        {
          text: 'summary-section',
          description: 'Examplate of a "summary-section" report template',
          href: '/templates/summary-section',
        },
      ],
    })
  }
}
