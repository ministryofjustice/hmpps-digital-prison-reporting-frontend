import { RequestHandler } from 'express'
import localsHelper from '../../../../utils/localsHelper'

class MissingReportSubmittedController {
  layoutPath: string

  constructor(layoutPath: string) {
    this.layoutPath = layoutPath
  }

  GET: RequestHandler = async (req, res, next) => {
    const { nestedBaseUrl } = localsHelper.getValues(res)
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
        nestedBaseUrl,
        layoutPath: this.layoutPath,
      })
    } catch (error) {
      next(error)
    }
  }
}

export { MissingReportSubmittedController }
export default MissingReportSubmittedController
