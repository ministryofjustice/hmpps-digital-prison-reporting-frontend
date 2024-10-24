import { components } from '../types/api'
import Dict = NodeJS.Dict
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { RequestedReport } from '../types/UserReports'
import AsyncReportListUtils from '../components/async-report-list/utils'
import ReportActionsUtils from '../components/report-actions/utils'
import { Template } from '../types/Templates'
import ReportQuery from '../types/ReportQuery'
import CollatedSummaryBuilder from './CollatedSummaryBuilder/CollatedSummaryBuilder'
import SectionedDataTableBuilder from './SectionedDataTableBuilder/SectionedDataTableBuilder'
import ColumnUtils from '../components/columns/utils'

export const initDataSources = ({ req, res, services }: AsyncReportUtilsParams) => {
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
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
  const stateDataPromise = services.asyncReportsStore.getReportByTableId(tableId, userId)

  return [reportDefinitionPromise, reportDataPromise, reportDataCountPromise, stateDataPromise, summaryDataPromise]
}

export const getReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const dataPromises = initDataSources({ req, res, services })
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

  let renderData = {}
  let reportStateData: RequestedReport
  if (dataPromises) {
    await Promise.all(dataPromises).then(async (resolvedData) => {
      const definition = resolvedData[0] as unknown as components['schemas']['SingleVariantReportDefinition']
      const reportData = <Array<Dict<string>>>resolvedData[1]
      const count = <number>resolvedData[2]
      reportStateData = <RequestedReport>resolvedData[3]

      const { variant } = definition
      const { classification, printable, specification } = variant
      const { template } = specification
      const {
        reportName,
        name: variantName,
        description,
        timestamp,
        reportId,
        tableId,
        variantId,
        executionId,
        query,
        url,
      } = reportStateData
      const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, resolvedData[4])

      const { columns: reqColumns } = req.query
      const columns = ColumnUtils.getColumns(specification, <string[]>reqColumns)

      renderData = {
        executionId,
        variantName,
        variantId,
        reportName,
        reportId,
        description,
        tableId,
        classification,
        template,
        count,
        actions: ReportActionsUtils.initAsyncReportActions(variant, reportStateData),
        printable,
        querySummary: query.summary,
        requestedTimestamp: new Date(timestamp.requested).toLocaleString(),
        csrfToken,
        requestUrl: url.request,
        bookmarked: await services.bookmarkService.isBookmarked(variantId, userId),
        reportSummaries: collatedSummaryBuilder.collatePageSummaries(),
      }

      switch (template as Template) {
        case 'summary':
          // No further data required
          break

        case 'summary-section':
        case 'list-section':
          renderData = {
            ...renderData,
            ...new SectionedDataTableBuilder(specification)
              .withSummaries(collatedSummaryBuilder.collateDataTableSummaries())
              .withNoHeaderOptions(columns.value)
              .buildTable(reportData),
            columns,
          }
          break

        case 'list-tab':
        case 'crosstab':
          // Add template-specific calls here
          break

        default:
          renderData = {
            ...renderData,
            ...AsyncReportListUtils.getRenderData(
              req,
              specification,
              reportData,
              count,
              query.summary,
              collatedSummaryBuilder.collateDataTableSummaries(),
              columns,
            ),
          }
          break
      }
    })
  }

  if (Object.keys(renderData).length && Object.keys(reportStateData).length) {
    await services.asyncReportsStore.updateLastViewed(reportStateData.executionId, userId)
    await services.recentlyViewedStoreService.setRecentlyViewed(reportStateData, userId)
  }

  return { renderData }
}
