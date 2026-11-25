import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import { request } from '../utils'

class RequestReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    try {
      const executionData = await request({
        req,
        res,
        services: this.services,
        internal: true,
      })

      const { executionId } = executionData
      if (executionId) {
        const redirect = `${executionId}/status`
        res.redirect(redirect)
      } else {
        res.end()
      }
    } catch (error) {
      // TODO: Handle error
      next(error)
    }
  }
}

export { RequestReportController }
export default RequestReportController
