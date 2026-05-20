import { RequestHandler } from 'express'
import Dict = NodeJS.Dict
import LocalsHelper from '../utils/localsHelper'
import { Services } from '../types/Services'
import { ReportType, RequestedReport } from '../types/UserReports'
import { getDefinitionByType } from '../utils/definitionUtils'

export const setupCurrentDefinition = (services: Services): RequestHandler => {
  return async (req, res, next) => {
    const { token, dprUser, definitionsPath } = LocalsHelper.getValues(res)
    const { reportId, id, type, tableId } = req.params as {
      reportId: string
      id: string
      type: ReportType
      tableId?: string
    }

    if (!token || !dprUser) return

    const definitionSummary = await services.reportingService.getDefinitionSummary(
      token,
      reportId as string,
      definitionsPath,
    )

    res.locals['reportDefinitionSummary'] = definitionSummary

    let queryData: Dict<string | string[]> | undefined
    if (tableId) {
      const requestData: RequestedReport | undefined = await services.requestedReportService.getReportByTableId(
        tableId,
        dprUser.id,
      )
      queryData = requestData?.query?.data
    }

    const { fields, definition } = await getDefinitionByType(
      type,
      services,
      token,
      reportId,
      id,
      definitionsPath,
      queryData,
    )

    res.locals['fields'] = fields ?? []

    res.locals['definition'] = definition

    next()
  }
}

export default setupCurrentDefinition
