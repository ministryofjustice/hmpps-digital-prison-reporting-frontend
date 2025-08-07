import { RequestHandler } from 'express'

export default class DateRangeController {
  GET: RequestHandler = async (req, res, next) => {
    const filters = [
      {
        text: 'Date-range, with min and max',
        name: 'date-range-min-max',
        type: 'daterange',
        value: {
          start: '2003-02-01',
          end: '2007-05-04',
        },
        min: '2003-02-01',
        max: '2007-05-04',
      },
    ]

    res.render('views/pages/components/filters/view.njk', {
      title: 'Date range input',
      filters,
    })
  }
}
