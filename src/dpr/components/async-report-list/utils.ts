import parseUrl from 'parseurl'
import { Request } from 'express'
import ColumnUtils from '../columns/utils'
import PaginationUtils from '../pagination/utils'
import { components } from '../../types/api'
import Dict = NodeJS.Dict
import { AsyncReportData } from '../../types/AsyncReport'
import DataTableBuilder from '../../utils/DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../utils/DataTableBuilder/types'

export default {
  getRenderData: (
    req: Request,
    definition: components['schemas']['SingleVariantReportDefinition'],
    reportData: Array<Dict<string>>,
    count: number,
    reportStateData: AsyncReportData,
  ) => {
    const { specification } = definition.variant
    const { columns: reqColumns } = req.query
    const columns = ColumnUtils.getColumns(specification, <string[]>reqColumns)
    const url = parseUrl(req)
    const pagination = PaginationUtils.getPaginationData(url, count)
    const { query } = reportStateData
    const dataTable: DataTable = new DataTableBuilder(specification)
      .withNoHeaderOptions(columns.value)
      .buildTable(reportData)

    return {
      ...dataTable,
      columns,
      pagination,
      appliedFilters: query.summary,
    }
  },
}
