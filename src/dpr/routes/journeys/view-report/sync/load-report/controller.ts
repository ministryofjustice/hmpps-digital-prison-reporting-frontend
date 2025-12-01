import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import LocalsHelper from '../../../../../utils/localsHelper'
import { ReportType } from '../../../../../types/UserReports'
import { components } from '../../../../../types/api'

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
      const { reportId, id, type } = req.params
      const { dataProductDefinitionsPath } = req.query

      const definitionSummary = await this.services.reportingService.getDefinitionSummary(
        token,
        reportId,
        <string | undefined>dataProductDefinitionsPath,
      )

      let definition:
        | components['schemas']['SingleVariantReportDefinition']
        | components['schemas']['DashboardDefinition']

      let classification
      let description
      let name
      if (type === ReportType.REPORT) {
        definition = await this.services.reportingService.getDefinition(
          token,
          reportId,
          id,
          <string | undefined>dataProductDefinitionsPath,
        )
        const { variant } = definition
        classification = variant.classification
        description = variant.description
        name = variant.name
      } else {
        definition = await this.services.dashboardService.getDefinition(
          token,
          reportId,
          id,
          <string | undefined>dataProductDefinitionsPath,
        )
        description = definition.description
        name = definition.name
      }
      const { name: reportName, description: reportDescription } = definitionSummary

      const renderData = {
        reportId,
        id,
        type,
        reportName,
        name,
        classification,
        description: description || reportDescription,
      }

      res.render(`dpr/routes/journeys/view-report/sync/load-report/view`, {
        renderData,
        layoutPath: this.layoutPath,
      })
    } catch (error) {
      next()
    }
  }
}

export { LoadReportController }
export default LoadReportController
