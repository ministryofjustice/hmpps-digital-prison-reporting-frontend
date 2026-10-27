import { RequestHandler } from 'express'
import { ReportingService } from '../../../services'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'

class RequestReportAccessController {
  layoutPath: string

  reportingService: ReportingService

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.reportingService = services.reportingService
  }

  GET: RequestHandler = async (req, res, next) => {
    const { definitions } = LocalsHelper.getValues(res)
    const { reportId } = req.params
    const definition = definitions.find((def: { id: string | string[] }) => def.id === reportId)

    const reportData = {
      productName: definition?.name ?? '',
      productVariants: definition?.variants.map((variant: { name: string }) => variant.name) ?? [],
    }

    try {
      res.render(`dpr/routes/journeys/request-report-access/view`, {
        layoutPath: this.layoutPath,
        title: 'Request access to this report',
        reportData,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default RequestReportAccessController
