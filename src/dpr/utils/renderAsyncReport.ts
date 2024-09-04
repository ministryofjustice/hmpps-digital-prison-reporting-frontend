import { components } from '../types/api'
import Dict = NodeJS.Dict
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { AsyncReportData } from '../types/AsyncReport'
import AsyncReportListUtils from '../components/async-report-list/utils'
import ReportActionsUtils from '../components/icon-button-list/utils'
import { Template } from '../types/Templates'
import ReportQuery from '../types/ReportQuery'
import CollatedSummaryBuilder from './CollatedSummaryBuilder/CollatedSummaryBuilder'

export const initDataSources = ({ req, res, services }: AsyncReportUtilsParams) => {
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, variantId: reportVariantId, tableId } = req.params
  const dataProductDefinitionsPath = <string>req.query.dataProductDefinitionsPath
  const reportDefinitionPromise = services.reportingService.getDefinition(
    token,
    reportId,
    reportVariantId,
    dataProductDefinitionsPath,
  )
  const reportDataPromise = reportDefinitionPromise.then(
    (definition: components['schemas']['SingleVariantReportDefinition']) => {
      const { variant } = definition
      const { specification } = variant
      const reportQuery = new ReportQuery(specification, req.query, dataProductDefinitionsPath)

      return services.reportingService.getAsyncReport(token, reportId, reportVariantId, tableId, {
        selectedPage: reportQuery.selectedPage,
        pageSize: reportQuery.pageSize,
        dataProductDefinitionsPath,
      })
    },
  )
  const summaryDataPromise = reportDefinitionPromise.then(
    (definition: components['schemas']['SingleVariantReportDefinition']) => {
      if (!definition.variant.summaries) {
        return Promise.resolve([])
      }
      return Promise.all(
        definition.variant.summaries.map((summary) => {
          return services.reportingService
            .getAsyncSummaryReport(token, reportId, reportVariantId, tableId, summary.id, {
              dataProductDefinitionsPath,
            })
            .then((data: Array<Dict<string>>) => ({
              ...summary,
              data,
            }))
        }),
      )
    },
  )

  const reportDataCountPromise = services.reportingService.getAsyncCount(token, tableId)
  const stateDataPromise = services.asyncReportsStore.getReportByTableId(tableId)

  return [reportDefinitionPromise, reportDataPromise, reportDataCountPromise, stateDataPromise, summaryDataPromise]
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

      const { variant } = definition
      const { classification, printable, specification } = variant
      const { template } = specification
      const {
        reportName,
        name: variantName,
        description,
        timestamp,
        reportId,
        variantId,
        executionId,
      } = reportStateData
      const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, resolvedData[4])

      renderData = {
        executionId,
        variantName,
        variantId,
        reportName,
        reportId,
        description,
        classification,
        template,
        actions: ReportActionsUtils.initAsyncReportActions(variant, reportStateData),
        printable,
        requestedTimestamp: new Date(timestamp.requested).toLocaleString(),
        csrfToken,
        bookmarked: services.bookmarkService.isBookmarked(variantId),
      }

      switch (template as Template) {
        case 'summary-section':
          renderData = {
            ...renderData,
            reportSummaries: collatedSummaryBuilder.collateSectionedAndMapToDataTable(),
          }
          break

        case 'list-tab':
        case 'crosstab':
          // Add template-specific calls here
          break

        default:
          renderData = {
            ...renderData,
            reportSummaries: collatedSummaryBuilder.collateAndMapToDataTable(),
            ...AsyncReportListUtils.getRenderData(
              req,
              definition,
              reportData,
              count,
              reportStateData,
              collatedSummaryBuilder.collate(),
            ),
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
