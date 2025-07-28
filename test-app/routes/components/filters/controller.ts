import { RequestHandler } from 'express'

export default class FiltersController {
  layoutPath: string

  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/menu.njk', {
      title: 'Filter inputs',
      caption: 'Components',
      cards: [
        {
          text: 'Autocomplete',
          description: 'Autocomplete input component.',
          href: '/components/filters/autocomplete',
        },
        {
          text: 'Date',
          description: 'Date input component.',
          href: '/components/filters/date',
        },
        {
          text: 'Date range',
          description: 'Date range component.',
          href: '/components/filters/date-range',
        },
        {
          text: 'Granular date range',
          description: 'Granular date range input component.',
          href: '/components/filters/granular-date-range',
        },
        {
          text: 'Multiselect',
          description: 'Multiselect input component.',
          href: '/components/filters/multiselect',
        },
      ],
    })
  }
}
