import { RequestHandler } from 'express'

export default class DateRangeController {
  GET: RequestHandler = async (req, res, next) => {
    const filters = [
      {
        text: 'Date-range',
        name: 'date-range',
        type: 'daterange',
      },
    ]

    res.render('views/pages/components/filters/view.njk', {
      title: 'Date range input',
      filters,
    })
  }
}
