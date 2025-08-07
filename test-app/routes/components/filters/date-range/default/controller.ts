import { RequestHandler } from 'express'

export default class DateRangeController {
  GET: RequestHandler = async (req, res, next) => {
    const filters = [
      {
        text: 'Default Date-range',
        name: 'default-date-range',
        type: 'daterange',
        value: {
          start: '2003-02-01',
          end: '2007-05-04',
        },
      },
    ]

    res.render('views/pages/components/filters/view.njk', {
      title: 'Date range input',
      filters,
    })
  }
}
