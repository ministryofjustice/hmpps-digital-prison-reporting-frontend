import parseUrl from 'parseurl'
import { Request } from 'express'
import Dict = NodeJS.Dict
import type { Columns } from '../../_reports/report-columns-form/types'
import type { Template } from '../../../types/Templates'
import type { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import type { DataTable } from '../../../utils/DataTableBuilder/types'
import type { components } from '../../../types/api'
import type { AsyncSummary, RequestedReport } from '../../../types/UserReports'
import { LoadType, ReportType } from '../../../types/UserReports'
import ReportQuery from '../../../types/ReportQuery'

import DataTableBuilder from '../../../utils/DataTableBuilder/DataTableBuilder'
import CollatedSummaryBuilder from '../../../utils/CollatedSummaryBuilder/CollatedSummaryBuilder'
import SectionedDataTableBuilder from '../../../utils/SectionedDataTableBuilder/SectionedDataTableBuilder'

import PaginationUtils from '../../_reports/report-pagination/utils'
import TotalsUtils from '../../_reports/report-totals/utils'
import ReportFiltersUtils from '../../_filters/utils'
import ColumnUtils from '../../_reports/report-columns-form/utils'
import ReportActionsUtils from '../../_reports/report-actions/utils'
import UserReportsUtils from '../../user-reports/utils'
import LocalsHelper from '../../../utils/localsHelper'
import { DownloadActionParams } from '../../_reports/report-actions/types'

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

      const query = new ReportQuery({
        fields: specification.fields,
        template: specification.template as Template,
        queryParams: req.query,
        definitionsPath: dataProductDefinitionsPath,
      }).toRecordWithFilterPrefix(true)

      return services.reportingService.getAsyncReport(token, reportId, reportVariantId, tableId, query)
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
  const stateDataPromise = services.requestedReportService.getReportByTableId(tableId, userId)

  return [reportDefinitionPromise, reportDataPromise, stateDataPromise, summaryDataPromise]
}

const getReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, csrfToken, userId } = LocalsHelper.getValues(res)

  const dataPromises = initDataSources({ req, res, services, token, userId })
  let renderData = {}
  let reportStateData: RequestedReport
  const url = parseUrl(req)
  const { search, pathname } = url

  if (dataPromises) {
    await Promise.all(dataPromises).then(async (resolvedData) => {
      // Report Definiton
      const definition = resolvedData[0] as components['schemas']['SingleVariantReportDefinition']
      const { variant } = definition
      const { classification, printable, specification } = variant
      const { template } = specification
      const { interactive } = <components['schemas']['VariantDefinition'] & { interactive?: boolean }>variant

      // Data
      const reportData = resolvedData[1] as Dict<string>[]
      // Requested Report Data
      reportStateData = resolvedData[2] as RequestedReport
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
        url: stateUrl,
        dataProductDefinitionsPath,
      } = reportStateData
      const reportStateVars = {
        reportName,
        name,
        description,
        requestedTimestamp: new Date(timestamp.requested).toLocaleString(),
        reportId,
        tableId,
        id: variantId || id,
        executionId,
        querySummary: query.summary,
        requestUrl: stateUrl.request,
      }
      // Report summaries
      const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, resolvedData[3])

      const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, reportStateVars.id)

      const reportQuery = new ReportQuery({
        fields: specification.fields,
        template: specification.template as Template,
        queryParams: req.query,
        definitionsPath: dataProductDefinitionsPath,
      })

      let count
      if (!interactive) {
        count = await services.reportingService.getAsyncCount(token, tableId)
      } else {
        count = await services.reportingService.getAsyncInteractiveCount(token, tableId, reportId, id, reportQuery)
      }

      // Columns & interactive filters
      const columns = ColumnUtils.getColumns(specification, <string[]>req.query.columns)
      const filterData = await ReportFiltersUtils.getFilters({
        fields: specification.fields,
        req,
        interactive: true,
      })

      renderData = {
        ...reportStateVars,
        classification,
        template,
        count,
        filterData,
        columns,
        loadType: LoadType.ASYNC,
        type: ReportType.REPORT,
        actions: setActions(csrfToken, variant, reportStateData, columns, canDownload, count, pathname, search),
        printable,
        requestedTimestamp: new Date(timestamp.requested).toLocaleString(),
        csrfToken,
        bookmarked: await services.bookmarkService.isBookmarked(reportStateVars.id, userId),
        canDownload,
        reportSummaries: collatedSummaryBuilder.collatePageSummaries(),
        dataProductDefinitionsPath,
        reportUrl: pathname.replace('/download-disabled', '').replace('/download-disabled?', ''),
        reportSearch: search,
        encodedSearch: search ? encodeURIComponent(search) : undefined,
      }

      switch (template as Template) {
        case 'summary':
          // No further data required
          break

        case 'summary-section':
        case 'list-section': {
          const dataTable = new SectionedDataTableBuilder(specification)
            .withSummaries(collatedSummaryBuilder.collateDataTableSummaries())
            .withHeaderOptions({
              columns: columns.value,
              reportQuery,
              interactive,
            })
            .buildTable(reportData)

          renderData = {
            ...renderData,
            dataTable,
          }
          break
        }
        case 'list-tab':
          // Add template-specific calls here
          break

        default:
          renderData = {
            ...renderData,
            ...getRenderData(
              req,
              specification,
              reportData,
              count,
              query.summary,
              collatedSummaryBuilder.collateDataTableSummaries(),
              columns,
              reportQuery,
              interactive,
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
      search,
      href: pathname,
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
  currentUrl: string,
  currentQueryParams: string,
) => {
  const { reportName, name, id, variantId, reportId, tableId, executionId, dataProductDefinitionsPath, url } =
    requestData
  const requestUrl = url.request.fullUrl
  const { printable } = variant
  const ID = variantId || id

  const downloadConfig: DownloadActionParams = {
    enabled: count > 0,
    name,
    reportName,
    csrfToken,
    reportId,
    id: ID,
    tableId,
    columns: columns.value,
    definitionPath: dataProductDefinitionsPath,
    loadType: LoadType.ASYNC,
    canDownload,
    currentUrl,
    currentQueryParams,
  }

  const shareConfig = {
    reportName,
    name,
    url: requestUrl,
  }

  const refreshConfig = {
    url: requestUrl,
    executionId,
  }

  return ReportActionsUtils.getActions({
    download: downloadConfig,
    print: { enabled: printable },
    share: shareConfig,
    refresh: refreshConfig,
    copy: { url: requestUrl },
  })
}

export const getRenderData = (
  req: Request,
  specification: components['schemas']['Specification'],
  reportData: Array<Dict<string>>,
  count: number,
  querySummary: Array<Dict<string>>,
  reportSummaries: Dict<Array<AsyncSummary>>,
  columns: Columns,
  reportQuery: ReportQuery,
  interactive = false,
) => {
  const url = parseUrl(req)
  const pagination = PaginationUtils.getPaginationData(url, count)

  const dataTable: DataTable = new DataTableBuilder(specification.fields)
    .withSummaries(reportSummaries)
    .withHeaderOptions({
      columns: columns.value,
      reportQuery,
      interactive,
    })
    .buildTable(reportData)

  const totals = TotalsUtils.getTotals(
    pagination.pageSize,
    pagination.currentPage,
    pagination.totalRows,
    dataTable.rowCount,
  )

  return {
    dataTable,
    pagination,
    querySummary,
    totals,
  }
}

export default {
  getReport,
}
