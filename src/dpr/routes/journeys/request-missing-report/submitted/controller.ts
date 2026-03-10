import { RequestHandler } from 'express'
import localsHelper from '../../../../utils/localsHelper'
import { setNestedPath } from '../../../../utils/urlHelper'

class MissingReportSubmittedController {
  layoutPath: string

  constructor(layoutPath: string) {
    this.layoutPath = layoutPath
  }

  GET: RequestHandler = async (req, res, next) => {
    const { nestedBaseUrl } = localsHelper.getValues(res)
    const cataloguePath = setNestedPath('/', nestedBaseUrl)
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
        cataloguePath,
        layoutPath: this.layoutPath,
      })
    } catch (error) {
      next(error)
    }
  }
}

export { MissingReportSubmittedController }
export default MissingReportSubmittedController
