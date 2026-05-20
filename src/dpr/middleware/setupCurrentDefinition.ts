import { RequestHandler } from 'express'
import Dict = NodeJS.Dict
import LocalsHelper from '../utils/localsHelper'
import { Services } from '../types/Services'
import { ReportType, RequestedReport } from '../types/UserReports'
import { getDefinitionByType } from '../utils/definitionUtils'

export const setupCurrentDefinition = (services: Services): RequestHandler => {
  return async (req, res) => {
    const { token, dprUser } = LocalsHelper.getValues(res)
    const { reportId, id, type, tableId } = req.params as {
      reportId: string
      id: string
      type: ReportType
      tableId?: string
    }

    if (!token || !dprUser) return

    const dataProductDefinitionsPath = res.locals['definitionsPath']

    const definitionSummary = await services.reportingService.getDefinitionSummary(
      token,
      reportId as string,
      dataProductDefinitionsPath,
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
      dataProductDefinitionsPath,
      queryData,
    )

    res.locals['fields'] = fields ?? []

    res.locals['definition'] = definition
  }
}

export default setupCurrentDefinition
