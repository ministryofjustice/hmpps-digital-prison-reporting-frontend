import { RequestHandler } from 'express'
import data from './data'

export default class SummaryTemplateController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    const reportData = data
    res.render('views/pages/report-template/view.njk', {
      title: 'Summary template',
      reportData,
    })
  }
}
