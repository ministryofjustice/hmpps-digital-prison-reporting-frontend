import parseUrl from 'parseurl'
import { Request } from 'express'
import PaginationUtils from '../pagination/utils'
import TotalsUtils from '../report-totals/utils'
import { components } from '../../types/api'
import DataTableBuilder from '../../utils/DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../utils/DataTableBuilder/types'
import ColumnUtils from '../columns/utils'
import ReportQuery from '../../types/ReportQuery'
import { ListWithWarnings } from '../../data/types'
import { LoadType, ReportType } from '../../types/UserReports'
import { Columns } from '../columns/types'
import ReportActionsUtils from '../report-actions/utils'
import { SyncReportFeatures, SyncReportOptions } from '../../types/SyncReportUtils'
import SyncFiltersUtils from '../sync-filters/utils'

const setActions = (
  csrfToken: string,
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  url: string,
  features: SyncReportFeatures = {},
) => {
  const { name: reportName, variant, id: reportId } = reportDefinition
  const { name, id, printable } = variant

  return ReportActionsUtils.getActions({
    ...(features.download && {
      download: {
        enabled: true,
        name,
        reportName,
        csrfToken,
        reportId,
        id,
        type: ReportType.REPORT,
        columns: columns.value,
        loadType: LoadType.SYNC,
      },
    }),
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

export default {
  getRenderData: async ({
    req,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
    features,
    options,
  }: {
    req: Request
    reportDefinition: components['schemas']['SingleVariantReportDefinition']
    reportQuery: ReportQuery
    reportData: ListWithWarnings
    csrfToken: string
    count: number
    features: SyncReportFeatures
    options: SyncReportOptions
  }) => {
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

    const { dynamicAutocompleteEndpoint } = options
    const filters = await SyncFiltersUtils.getFilters({
      fields: specification.fields,
      req,
      dynamicAutocompleteEndpoint,
    })

    const columns = ColumnUtils.getColumns(specification, reportQuery.columns)

    const actions = setActions(
      csrfToken,
      reportDefinition,
      columns,
      `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      features,
    )

    return {
      reportName,
      name,
      description: description || reportDescription,
      ...dataTable,
      count,
      type: ReportType.REPORT,
      columns,
      filters,
      pagination,
      totals,
      classification,
      printable,
      actions,
      warnings: reportData.warnings,
    }
  },
}
