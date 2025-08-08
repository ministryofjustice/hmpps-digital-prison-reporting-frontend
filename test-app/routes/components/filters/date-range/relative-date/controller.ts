import { RequestHandler } from 'express'

export default class DateRangeController {
  GET: RequestHandler = async (req, res, next) => {
    const filters = [
      {
        text: 'Relative Date-range',
        name: 'relative-date-range',
        type: 'daterange',
        mandatory: true,
        relativeOptions: [
          { value: 'none', text: 'None' },
          { value: 'yesterday', text: 'Yesterday' },
          { value: 'tomorrow', text: 'Tomorrow' },
          { value: 'last-week', text: 'Last week' },
          { value: 'next-week', text: 'Next week' },
          { value: 'last-month', text: 'Last month' },
          { value: 'next-month', text: 'Next month' },
        ],
      },
    ]

    res.render('views/pages/components/filters/view.njk', {
      title: 'Date range input',
      filters,
    })
  }
}
