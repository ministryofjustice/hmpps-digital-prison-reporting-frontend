import { RequestHandler } from 'express'
import LocalsHelper from '../../../utils/localsHelper'
import { Services } from '../../../types/Services'
import { ReportingService } from '../../../services'

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
    const definition = definitions.find(def => def.id === reportId)

    const reportData = {
      productName: definition?.name ?? '',
      productVariants: definition?.variants.map(variant => variant.name) ?? [],
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
