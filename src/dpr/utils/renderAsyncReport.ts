import { components } from '../types/api'
import Dict = NodeJS.Dict
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { AsyncReportData } from '../types/AsyncReport'
import AsyncReportListUtils from '../components/async-report-list/utils'
import ReportActionsUtils from '../components/icon-button-list/utils'
import { Template } from '../types/Template'

export const initDataSources = ({ req, res, services }: AsyncReportUtilsParams) => {
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, variantId: reportVariantId, tableId } = req.params
  const { selectedPage = 1, pageSize = 10 } = req.query
  const dataProductDefinitionsPath = <string>req.query.dataProductDefinitionsPath
  const reportDefinitionPromise = services.reportingService.getDefinition(
    token,
    reportId,
    reportVariantId,
    dataProductDefinitionsPath,
  )
  const reportDataPromise = services.reportingService.getAsyncReport(token, reportId, reportVariantId, tableId, {
    selectedPage: +selectedPage,
    pageSize: +pageSize,
    dataProductDefinitionsPath,
  })
  const reportDataCountPromise = services.reportingService.getAsyncCount(token, tableId)
  const stateDataPromise = services.asyncReportsStore.getReportByTableId(tableId)

  return [reportDefinitionPromise, reportDataPromise, reportDataCountPromise, stateDataPromise]
}

export const getReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const dataPromises = initDataSources({ req, res, services })

  let renderData = {}
  let reportStateData: AsyncReportData
  if (dataPromises) {
    await Promise.all(dataPromises).then((resolvedData) => {
      const definition = resolvedData[0] as unknown as components['schemas']['SingleVariantReportDefinition']
      const reportData = <Array<Dict<string>>>resolvedData[1]
      const count = <number>resolvedData[2]
      reportStateData = <AsyncReportData>resolvedData[3]

      const { classification } = definition.variant
      const { template } = definition.variant.specification
      const { reportName, name: variantName, description, timestamp, reportId, variantId } = reportStateData
      const actions = ReportActionsUtils.initAsyncReportActions(definition.variant, reportStateData)

      renderData = {
        variantName,
        variantId,
        reportName,
        reportId,
        description,
        classification,
        template,
        actions,
        requestedTimestamp: new Date(timestamp.requested).toLocaleString(),
        csrfToken,
        bookmarked: services.bookmarkService.isBookmarked(variantId),
      }

      switch (template as Template) {
        case 'list-aggregate':
        case 'list-tab':
        case 'crosstab':
        case 'summary':
          // Add template-specific calls here
          break

        default:
          renderData = {
            ...renderData,
            ...AsyncReportListUtils.getRenderData(req, definition, reportData, count, reportStateData),
          }
          break
      }
    })
  }

  if (Object.keys(renderData).length && Object.keys(reportStateData).length) {
    await services.asyncReportsStore.updateLastViewed(reportStateData.executionId)
    await services.recentlyViewedStoreService.setRecentlyViewed(reportStateData)
  }

  return { renderData }
}
