import { RequestHandler } from 'express'
import data from './data'

export default class SummarySectionTemplateController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    const reportData = data
    res.render('views/pages/report-template/view.njk', {
      title: 'Summary section template',
      reportData,
    })
  }
}
