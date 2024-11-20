import AsyncReportListUtils from '../components/_async/async-report/utils'
import ReportActionsUtils from '../components/_reports/report-actions/utils'
import ReportFiltersUtils from '../components/_filters/utils'
import ColumnUtils from '../components/_reports/report-columns-form/utils'
import UserReportsUtils from '../components/user-reports/utils'

import CollatedSummaryBuilder from './CollatedSummaryBuilder/CollatedSummaryBuilder'
import SectionedDataTableBuilder from './SectionedDataTableBuilder/SectionedDataTableBuilder'

// Types
import type { components } from '../types/api'
import type { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import type { Template } from '../types/Templates'
import type { Columns } from '../components/_reports/report-columns-form/types'
import { LoadType, ReportType, RequestedReport } from '../types/UserReports'
import ReportQuery from '../types/ReportQuery'
import Dict = NodeJS.Dict

export const initDataSources = ({
  req,
  services,
  token,
  userId,
}: AsyncReportUtilsParams & { token: string; userId: string }) => {
  const { reportId, variantId, id, tableId } = req.params
  const dataProductDefinitionsPath = <string>req.query.dataProductDefinitionsPath

  const reportVariantId = variantId || id

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
  const stateDataPromise = services.requestedReportService.getReportByTableId(tableId, userId)

  return [reportDefinitionPromise, reportDataPromise, reportDataCountPromise, stateDataPromise, summaryDataPromise]
}

export const getReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
  const token = res.locals.user?.token ? res.locals.user.token : 'token'

  const dataPromises = initDataSources({ req, res, services, token, userId })
  let renderData = {}
  let reportStateData: RequestedReport

  if (dataPromises) {
    await Promise.all(dataPromises).then(async (resolvedData) => {
      // Report Definiton
      const definition = resolvedData[0] as components['schemas']['SingleVariantReportDefinition']
      const { variant } = definition
      const { classification, printable, specification } = variant
      const { template } = specification
      // TODO: fix this type once definition is known
      const { interactive } = <components['schemas']['VariantDefinition'] & { interactive?: boolean }>variant

      // Data & Count
      const reportData = resolvedData[1] as Dict<string>[]
      const count = resolvedData[2] as number

      // Requested Report Data
      reportStateData = resolvedData[3] as RequestedReport
      const {
        reportName,
        name,
        description,
        timestamp,
        reportId,
        tableId,
        variantId,
        id,
        executionId,
        query,
        url,
        dataProductDefinitionsPath,
      } = reportStateData
      const reportStataVars = {
        reportName,
        name,
        description,
        requestedTimestamp: new Date(timestamp.requested).toLocaleString(),
        reportId,
        tableId,
        id: variantId || id,
        executionId,
        querySummary: query.summary,
        requestUrl: url.request,
      }

      const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, resolvedData[4])
      const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, reportStataVars.id)
      const reportQuery = new ReportQuery(specification, req.query, <string>dataProductDefinitionsPath)

      // Columns & interactive filters
      const columns = ColumnUtils.getColumns(specification, <string[]>req.query.columns)
      const filterData = await ReportFiltersUtils.getFilters({
        fields: specification.fields,
        req,
        interactive: false,
      })

      renderData = {
        ...reportStataVars,
        classification,
        template,
        count,
        filterData,
        columns,
        loadType: LoadType.ASYNC,
        type: ReportType.REPORT,
        actions: setActions(csrfToken, variant, reportStateData, columns, canDownload, count),
        printable,
        requestedTimestamp: new Date(timestamp.requested).toLocaleString(),
        csrfToken,
        bookmarked: await services.bookmarkService.isBookmarked(reportStataVars.id, userId),
        canDownload,
        reportSummaries: collatedSummaryBuilder.collatePageSummaries(),
      }

      switch (template as Template) {
        case 'summary':
          // No further data required
          break

        case 'summary-section':
        case 'list-section': {
          renderData = {
            ...renderData,
            ...new SectionedDataTableBuilder(specification)
              .withSummaries(collatedSummaryBuilder.collateDataTableSummaries())
              .withHeaderOptions({
                columns: columns.value,
                reportQuery,
                interactive,
              })
              .buildTable(reportData),
          }
          break
        }
        case 'list-tab':
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
              reportQuery,
            ),
          }
          break
      }
    })
  }

  if (Object.keys(renderData).length && Object.keys(reportStateData).length) {
    UserReportsUtils.updateLastViewed({
      services,
      reportStateData,
      userId,
    })
  }

  return { renderData }
}

const setActions = (
  csrfToken: string,
  variant: components['schemas']['VariantDefinition'],
  requestData: RequestedReport,
  columns: Columns,
  canDownload: boolean,
  count: number,
) => {
  const { reportName, name, id, variantId, reportId, executionId, tableId, type, dataProductDefinitionsPath } =
    requestData
  const url = requestData.url.request.fullUrl
  const { printable } = variant
  const ID = variantId || id

  const downloadConfig = {
    enabled: count > 0,
    name,
    reportName,
    csrfToken,
    reportId,
    id: ID,
    tableId,
    type: type || ReportType.REPORT,
    columns: columns.value,
    definitionPath: dataProductDefinitionsPath,
    loadType: LoadType.ASYNC,
    canDownload,
  }

  const shareConfig = {
    reportName,
    name,
    url,
  }

  const refreshConfig = {
    url,
    executionId,
  }

  return ReportActionsUtils.getActions({
    download: downloadConfig,
    print: { enabled: printable },
    share: shareConfig,
    refresh: refreshConfig,
    copy: { url },
  })
}
