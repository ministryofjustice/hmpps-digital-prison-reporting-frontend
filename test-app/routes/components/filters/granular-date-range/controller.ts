import { RequestHandler } from 'express'

export default class GranularDateRangeController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/filters/granular-date-range/view.njk', {
      title: 'Granular date range input',
      defaultInput: {},
    })
  }
}
