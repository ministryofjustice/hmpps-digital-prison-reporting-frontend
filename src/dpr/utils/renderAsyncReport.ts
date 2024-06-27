import { components } from '../types/api'
import Dict = NodeJS.Dict
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { AsyncReportData } from '../types/AsyncReport'
import AsyncReportListUtils from '../components/async-report-list/utils'

export const initDataSources = ({ req, res, next, asyncReportsStore, dataSources }: AsyncReportUtilsParams) => {
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, variantId: reportVariantId, tableId } = req.params
  const { selectedPage = 1, pageSize = 10 } = req.query
  const dataProductDefinitionsPath = <string>req.query.dataProductDefinitionsPath
  const reportDefinitionPromise = dataSources.getDefinition(
    token,
    reportId,
    reportVariantId,
    dataProductDefinitionsPath,
  )
  const reportDataPromise = dataSources.getAsyncReport(token, reportId, reportVariantId, tableId, {
    selectedPage: +selectedPage,
    pageSize: +pageSize,
    dataProductDefinitionsPath,
  })
  const reportDataCountPromise = dataSources.getAsyncCount(token, tableId)
  const stateDataPromise = asyncReportsStore.getReportByTableId(tableId)

  return [reportDefinitionPromise, reportDataPromise, reportDataCountPromise, stateDataPromise]
}

export const getReport = async ({
  req,
  res,
  next,
  asyncReportsStore,
  recentlyViewedStoreService,
  dataSources,
}: AsyncReportUtilsParams) => {
  const dataPromises = initDataSources({ req, res, next, dataSources, asyncReportsStore })

  let renderData = {}
  let reportStateData: AsyncReportData
  if (dataPromises) {
    await Promise.all(dataPromises).then((resolvedData) => {
      const definition = resolvedData[0] as unknown as components['schemas']['SingleVariantReportDefinition']
      const reportData = <Array<Dict<string>>>resolvedData[1]
      const count = <number>resolvedData[2]
      reportStateData = <AsyncReportData>resolvedData[3]

      const { template } = definition.variant.specification
      switch (template) {
        case 'list':
          renderData = AsyncReportListUtils.getRenderData(req, definition, reportData, count, reportStateData)
          break
        case 'listWithSections':
          // TODO
          break
        default:
          renderData = AsyncReportListUtils.getRenderData(req, definition, reportData, count, reportStateData)
          break
      }
    })
  }

  if (Object.keys(renderData).length && Object.keys(reportStateData).length) {
    await asyncReportsStore.updateLastViewed(reportStateData.executionId)
    await recentlyViewedStoreService.setRecentlyViewed(reportStateData)
  }

  return { renderData }
}
