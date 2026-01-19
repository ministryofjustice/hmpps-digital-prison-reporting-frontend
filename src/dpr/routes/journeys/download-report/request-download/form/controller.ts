import { RequestHandler } from 'express'
import LocalsHelper from '../../../../../utils/localsHelper'
import { components } from '../../../../../types/api'
import { Services } from '../../../../../types/Services'
import { LoadType } from '../../../../../types/UserReports'
import logger from '../../../../../utils/logger'

class RequestDownloadController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    const { token, csrfToken, definitionsPath, dprUser } = LocalsHelper.getValues(res)
    const { reportId, variantId, tableId } = req.params
    const loadType = tableId ? LoadType.ASYNC : LoadType.SYNC

    const { reportSearch, reportUrl } = req.query
    let queryString
    let dataProductDefinitionsPath

    if (reportSearch) {
      queryString = decodeURIComponent(<string>reportSearch)
      const params = new URLSearchParams(queryString)
      dataProductDefinitionsPath = params.get('dataProductDefinitionsPath') || definitionsPath
    }

    const variantData: components['schemas']['SingleVariantReportDefinition'] =
      await this.services.reportingService.getDefinition(token, reportId, variantId, dataProductDefinitionsPath)

    try {
      res.render(`dpr/routes/journeys/download-report/request-download/form/view`, {
        title: 'Download request form',
        user: dprUser,
        report: {
          reportId,
          reportName: variantData.name,
          variantId,
          variantName: variantData.variant.name,
          tableId,
          loadType,
          reportUrl,
          reportSearch: reportSearch || undefined,
          time: new Date().toDateString(),
        },
        csrfToken,
        layoutPath: this.layoutPath,
      })
    } catch (error) {
      next(error)
    }
  }

  POST: RequestHandler = async (req, res, _next) => {
    const { body, baseUrl } = req
    const { reportName, variantName, reportUrl, reportSearch } = body
    logger.info('Download Feedback Submission:', `${JSON.stringify(body)}`)

    let queryParams
    queryParams = `?reportName=${reportName}&variantName=${variantName}&reportUrl=${reportUrl}`

    if (reportSearch) {
      const encodedSearch = encodeURIComponent(reportSearch)
      queryParams = `${queryParams}&reportSearch=${encodedSearch}`
    }

    const redirect = `${baseUrl}/submitted${queryParams}`

    res.redirect(redirect)
  }
}

export { RequestDownloadController }
export default RequestDownloadController
