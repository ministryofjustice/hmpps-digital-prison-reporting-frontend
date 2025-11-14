import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import LocalsHelper from '../../../../../utils/localsHelper'
import { ReportType } from '../../../../../types/UserReports'

class LoadReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    try {
      const { token } = LocalsHelper.getValues(res)
      const { reportId, id } = req.params
      const { dataProductDefinitionsPath } = req.query

      const definition = await this.services.reportingService.getDefinition(
        token,
        reportId,
        id,
        <string | undefined>dataProductDefinitionsPath,
      )
      const { name: reportName, variant, description: reportDescription } = definition
      const { classification, description, name } = variant

      res.render(`dpr/routes/journeys/view-report/sync/load-report/view`, {
        renderData: {
          reportId,
          id,
          type: ReportType.REPORT,
          reportName,
          name,
          classification,
          description: description || reportDescription,
        },
        layoutPath: this.layoutPath,
      })
    } catch (error) {
      next()
    }
  }
}

export { LoadReportController }
export default LoadReportController
