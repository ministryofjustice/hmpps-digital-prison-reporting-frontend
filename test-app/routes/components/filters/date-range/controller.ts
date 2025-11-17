import { RequestHandler } from 'express'

export default class DateRangeController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Date range component variants',
      caption: 'Components',
      cards: [
        {
          text: 'Date range',
          description: 'Date range component example',
          href: '/components/filters/date-range/date-range',
        },
        {
          text: 'Date range with defaults',
          description: 'Date range component example with default values',
          href: '/components/filters/date-range/default-date-range',
        },
        {
          text: 'Date range with min & max',
          description: 'Date range component example with min and max contraints',
          href: '/components/filters/date-range/min-max-date-range',
        },
        {
          text: 'Relative date range',
          description: 'Date range component example with relative date radio buttons',
          href: '/components/filters/date-range/relative-date-range',
        },
        {
          text: 'Relative date range with min max',
          description: 'Date range component example with relative date radio buttons, and min and max defaults',
          href: '/components/filters/date-range/relative-min-max-date-range',
        },
        {
          text: 'Relative date range with defaults',
          description: 'Date range component example with relative date radio buttons',
          href: '/components/filters/date-range/relative-date-range-with-default',
        },
      ],
    })
  }
}
