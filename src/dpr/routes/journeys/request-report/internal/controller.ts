import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import { request } from '../utils'
import { checkStore } from './utils'

class RequestReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    try {
      // Check if report has already been run and is not expired
      const existingReport = await checkStore(req, res, this.services)

      if (existingReport && existingReport.url?.report?.fullUrl) {
        res.redirect(existingReport.url?.report?.fullUrl)
      } else {
        const executionData = await request({
          req,
          res,
          services: this.services,
          internal: true,
        })

        const { executionId } = executionData
        if (executionId) {
          const { type, reportId, id } = req.params

          if (executionId) {
            res.redirect(`/dpr/request-report/${type}/${reportId}/${id}/${executionId}/status`)
          }
        } else {
          res.end()
        }
      }
    } catch (error) {
      // TODO: Handle error
      next(error)
    }
  }
}

export { RequestReportController }
export default RequestReportController
