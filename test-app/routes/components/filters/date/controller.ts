import { RequestHandler } from 'express'

export default class DateController {
  GET: RequestHandler = async (req, res, next) => {
    res.render('views/pages/components/filters/date/view.njk', {
      title: 'Date input',
      defaultInput: {},
    })
  }
}
