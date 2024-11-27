import parseUrl from 'parseurl'
import type { Request, Response } from 'express'
import type { components } from '../../../types/api'
import type { DataTable } from '../../../utils/DataTableBuilder/types'
import type { ListWithWarnings } from '../../../data/types'
import type { Columns } from '../../_reports/report-columns-form/types'
import type { Services } from '../../../types/Services'
import type { DownloadActionParams } from '../../_reports/report-actions/types'
import { LoadType, ReportType } from '../../../types/UserReports'
import ReportQuery from '../../../types/ReportQuery'

import PaginationUtils from '../../_reports/report-pagination/utils'
import TotalsUtils from '../../_reports/report-totals/utils'
import ColumnUtils from '../../_reports/report-columns-form/utils'
import ReportActionsUtils from '../../_reports/report-actions/utils'
import FiltersUtils from '../../_filters/utils'

import DataTableBuilder from '../../../utils/DataTableBuilder/DataTableBuilder'
import { Template } from '../../../types/Templates'

const setActions = (
  csrfToken: string,
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  url: string,
  canDownload: boolean,
  count: number,
  dataProductDefinitionsPath: string,
) => {
  const { name: reportName, variant, id: reportId } = reportDefinition
  const { name, id, printable } = variant

  const downloadConfig: DownloadActionParams = {
    enabled: count > 0,
    name,
    reportName,
    csrfToken,
    reportId,
    id,
    type: ReportType.REPORT,
    columns: columns.value,
    loadType: LoadType.SYNC,
    definitionPath: dataProductDefinitionsPath,
    canDownload,
  }

  return ReportActionsUtils.getActions({
    download: downloadConfig,
    print: {
      enabled: printable,
    },
    share: {
      reportName,
      name,
      url,
    },
    copy: {
      url,
    },
  })
}

const getSyncReportData = async (services: Services, req: Request, token: string, reportId: string, id: string) => {
  const { dataProductDefinitionsPath } = req.query
  const reportDefinition = await services.reportingService.getDefinition(
    token,
    reportId,
    id,
    dataProductDefinitionsPath,
  )
  const { variant } = reportDefinition
  const { resourceName, specification } = variant

  const reportQuery = new ReportQuery({
    fields: specification.fields,
    template: specification.template as Template,
    queryParams: req.query,
    definitionsPath: <string>dataProductDefinitionsPath,
  })

  return {
    reportData: await services.reportingService.getListWithWarnings(resourceName, token, reportQuery),
    reportDefinition,
    reportQuery,
  }
}

const getReport = async ({ req, res, services }: { req: Request; res: Response; services: Services }) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, id } = req.params
  const { dataProductDefinitionsPath } = req.query

  const { reportData, reportDefinition, reportQuery } = await getSyncReportData(services, req, token, reportId, id)
  const count = await services.reportingService.getCount(reportDefinition.variant.resourceName, token, reportQuery)
  const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)

  const renderData = await getRenderData({
    req,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
    canDownload,
  })

  return {
    renderData: {
      ...renderData,
      csrfToken,
      loadType: LoadType.SYNC,
      reportId,
      id,
      dataProductDefinitionsPath,
    },
  }
}

const getRenderData = async ({
  req,
  reportDefinition,
  reportQuery,
  reportData,
  count,
  csrfToken,
  canDownload,
}: {
  req: Request
  reportDefinition: components['schemas']['SingleVariantReportDefinition']
  reportQuery: ReportQuery
  reportData: ListWithWarnings
  csrfToken: string
  count: number
  canDownload: boolean
}) => {
  const { dataProductDefinitionsPath } = req.query
  const { name: reportName, description: reportDescription } = reportDefinition
  const { specification, name, description, classification, printable } = reportDefinition.variant
  const { data } = reportData

  const url = parseUrl(req)
  const pagination = PaginationUtils.getPaginationData(url, count)

  const dataTable: DataTable = new DataTableBuilder(specification.fields)
    .withHeaderSortOptions(reportQuery)
    .buildTable(data)

  const totals = TotalsUtils.getTotals(
    pagination.pageSize,
    pagination.currentPage,
    pagination.totalRows,
    dataTable.rowCount,
  )

  const filterData = await FiltersUtils.getFilters({
    fields: specification.fields,
    req,
    interactive: false,
  })

  const columns = ColumnUtils.getColumns(specification, reportQuery.columns)

  const actions = setActions(
    csrfToken,
    reportDefinition,
    columns,
    `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    canDownload,
    count,
    <string>dataProductDefinitionsPath,
  )

  return {
    reportName,
    name,
    description: description || reportDescription,
    ...dataTable,
    count,
    type: ReportType.REPORT,
    columns,
    filterData,
    pagination,
    totals,
    classification,
    printable,
    actions,
    warnings: reportData.warnings,
  }
}

export default {
  getRenderData,
  getReport,
  getSyncReportData,
}
