import { RequestHandler } from 'express'

export default class MissingReportSubmittedController {
  layoutPath: string

  constructor(layoutPath: string) {
    this.layoutPath = layoutPath
  }

  GET: RequestHandler = async (req, res, next) => {
    const { reportId, variantId, reportName, name } = req.query

    try {
      res.render(`dpr/routes/journeys/request-missing-report/submitted/view`, {
        title: 'Request submitted',
        report: {
          reportId,
          variantId,
          reportName,
          name,
        },
        layoutPath: this.layoutPath,
      })
    } catch (error) {
      next()
    }
  }
}
