import parseUrl from 'parseurl'
import { Request } from 'express'
import PaginationUtils from '../pagination/utils'
import TotalsUtils from '../report-totals/utils'
import { components } from '../../types/api'
import Dict = NodeJS.Dict
import DataTableBuilder from '../../utils/DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../utils/DataTableBuilder/types'
import FilterUtils from '../filters/utils'
import { Columns } from '../columns/types'
import ReportQuery from '../../types/ReportQuery'
import { FilterOptions } from '../filters/types'
import createUrlForParameters from '../../utils/urlHelper'

export default {
  getRenderData: (
    req: Request,
    variantDefinition: components['schemas']['VariantDefinition'],
    reportQuery: ReportQuery,
    reportData: Array<Dict<string>>,
    count: number,
    columns: Columns,
    dynamicAutocompleteEndpoint?: string,
    querySummary?: Array<Dict<string>>,
  ) => {
    const { specification } = variantDefinition
    const url = parseUrl(req)
    const pagination = PaginationUtils.getPaginationData(url, count)

    const dataTable: DataTable = new DataTableBuilder(specification.fields)
      .withHeaderSortOptions(reportQuery)
      .buildTable(reportData)

    const totals = TotalsUtils.getTotals(
      pagination.pageSize,
      pagination.currentPage,
      pagination.totalRows,
      dataTable.rowCount,
    )

    const filters: FilterOptions = FilterUtils.getFilterOptions(
      variantDefinition,
      reportQuery,
      createUrlForParameters,
      dynamicAutocompleteEndpoint,
    )

    return {
      ...dataTable,
      columns,
      filters,
      pagination,
      querySummary,
      totals,
    }
  },
}
