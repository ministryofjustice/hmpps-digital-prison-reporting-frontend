import parseUrl from 'parseurl'
import { Request } from 'express'
import PaginationUtils from '../../_reports/report-pagination/utils'
import TotalsUtils from '../../_reports/report-totals/utils'
import { components } from '../../../types/api'
import Dict = NodeJS.Dict
import { AsyncSummary } from '../../../types/UserReports'
import DataTableBuilder from '../../../utils/DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../../utils/DataTableBuilder/types'
import { Columns } from '../../_reports/report-columns-form/types'
import ReportQuery from '../../../types/ReportQuery'

export default {
  getRenderData: (
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
      ...dataTable,
      pagination,
      querySummary,
      totals,
    }
  },
}
