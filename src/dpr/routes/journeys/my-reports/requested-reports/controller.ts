import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'

class RequestedReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  POST: RequestHandler = async (req, res) => {
    const { dprUser } = LocalsHelper.getValues(res)
    const { executionId } = req.params
    const { returnTo } = req.body

    await this.services.requestedReportService.removeReport(executionId as string, dprUser.id)

    if (returnTo && returnTo.startsWith('/')) {
      return res.redirect(returnTo)
    }

    res.redirect('/')
  }
}

export { RequestedReportsController }
export default RequestedReportsController
